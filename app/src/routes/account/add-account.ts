import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { InsertAccount } from "../../account/account.Usecase";


const ValidateListAccounts = {
    body: t.Object({
        pin: t.String({
            minLength: 6,
            maxLength: 6
        }),
    }),
    error({ error }: { error:any }) {
        return {
            msg: error
        }
    },
}

export const addAccount = new Elysia()
        .use(isAuthenticated)
        .post("/add-account",
        async function AddAccount({
            set,
            customerDecrypt,
            body,
            cookie: {currentAccount},
        }) {

            if (!customerDecrypt || !customerDecrypt.customerId) {
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }

            const {account, error} = await InsertAccount(customerDecrypt.customerId, body.pin)
            if(error !== undefined || account === undefined){
                set.status = 400;
                return {
                    msg:error || "create new account failed",
                    account: null
                }
            }            

            // set current account to be the new account
            currentAccount.set({
                value: account.accountId,
                httpOnly: false,
                maxAge: 7 * 86400,
                path: '/',
            })

            set.status = 200
            return {
                msg: "ok",
                account: account
            }

        },
       ValidateListAccounts
);

