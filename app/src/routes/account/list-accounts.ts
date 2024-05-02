import { Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { ListAllAccounts } from "../../account/account.Usecase";


const ValidateListAccounts = {
    query: t.Object({
        limit: t.Optional(t.Numeric({ default: 50 })),
        skip: t.Optional(t.Numeric({
            default: 0
        }))
    }),
    error({ code, error }: { code: string, error:any }) {
        return {
            msg: error
        }
    },
}
export const listAccounts = new Elysia()
    .use(jwtAccessSetup)
    .get("/list-accounts",
        async function ListAccounts({
            body,
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
