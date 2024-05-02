import { Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { ListAllTransactions } from "../../transaction/transaction.Usecase";
import { isAuthenticated } from "../../middleware/authen";


const ValidateTrasactions = {
    query: t.Object({
        limit: t.Optional(t.Numeric({ default: 50 })),
        skip: t.Optional(t.Numeric({
            default: 0
        }))
    }),
    error({ error }: {error:any}) {
        return {
            msg: error
        }
    },
}

export const listTransactions = new Elysia()
    .use(isAuthenticated)
    .get("/list-transactions",
        async function ListTransactions({
            set,
            query
        }) {

            const {limit, skip} = query
            
            const {transactions, error} = await ListAllTransactions(limit!, skip!)

            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "List all transactions failed"
                }
            }
            set.status = 200
            return {
                msg: "ok",
                transactions: transactions
            }

        },
       ValidateTrasactions
);
