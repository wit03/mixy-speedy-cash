import { Elysia, t } from "elysia";
import { FindAccountNameRepo } from "../../account/account.Repository";

const ValidateFindAccount = {
    query: t.Object({
        accountId: t.String({
            minLength: 2
        }),
    }),
    error({ error }: {error:any}) {
        return {
            msg: error
        }
    },
}

export const findAccountName = new Elysia()
    .get("/account-name",
        async function SignInHttpHandler({
            set,
            query
        }) {

            const account = await FindAccountNameRepo(query.accountId)
            if(!account){
                set.status = 400
                return {
                    msg:"Failed to get acconut data",
                    account: null
                }
            }
            set.status = 200
            return {
                msg:"Ok",
                account:account
            }

        },
        ValidateFindAccount
    );
