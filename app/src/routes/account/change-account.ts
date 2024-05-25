import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { FindAccountBalanceRepo } from "../../account/account.Repository";


const ValidateListAccounts = {
    query: t.Object({
        accountId: t.String({
            minLength: 2
        }),
    }),
    error({ error }: { error:any }) {
        return {
            msg: error
        }
    },
}

export const changeAccount = new Elysia()
        .use(isAuthenticated)
        .get("/change-account",
        async function ChangeAccount({
            set,
            customerDecrypt,
            cookie: {currentAccount},
            query
        }) {

            if (!customerDecrypt || !customerDecrypt.customerId || !query.accountId) {
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }

            const data = await FindAccountBalanceRepo(query.accountId)
            if(!data){
                set.status = 400;
                return {
                    msg:"Change account failed",
                    account: data
                }
            }            

            // set current account to be the new account
            currentAccount.set({
                value: data.accountId,
                httpOnly: false,
                maxAge: 7 * 86400,
                path: '/',
            })

            set.status = 200
            return {
                msg: "ok",
                account: data
            }

        },
       ValidateListAccounts
);

