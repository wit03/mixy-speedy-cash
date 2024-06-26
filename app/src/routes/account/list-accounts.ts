import { Elysia, t } from "elysia";
import { ListAllAccounts } from "../../account/account.Usecase";
import { isAuthenticated } from "../../middleware/authen";


const ValidateListAccounts = {
    query: t.Object({
        limit: t.Optional(t.Numeric({ default: 50 })),
        skip: t.Optional(t.Numeric({
            default: 0
        }))
    }),
    error({ error }: { error:any }) {
        return {
            msg: error
        }
    },
}
export const listAccounts = new Elysia()
    .use(isAuthenticated)
    .get("/list-accounts",
        async function ListAccounts({
            set,
            query
        }) {

            const {limit, skip} = query
            
            const {accounts, error} = await ListAllAccounts(limit!, skip!)

            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "List all accounts failed"
                }
            }
            set.status = 200
            return {
                msg: "ok",
                accounts: accounts
            }

        },
       ValidateListAccounts
);

