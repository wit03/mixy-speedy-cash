import { Elysia, t } from "elysia";
import { ListTransactionByCondition } from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";


const ValidateManagerReport = {
    query: t.Object({
        search: t.Optional(t.String({ default: "", })),
        type: t.Optional(t.String({
            default: "loan"
        }))
    }),
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const listTransactionWithCondition = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/list-transaction",
        async function listTransactionWithConditionHttpHandler({
            set,
            employeeDecrypt,
            query:{search, type}
        }) {
            if(!employeeDecrypt || (employeeDecrypt.position !== "manager" && employeeDecrypt.position !== "owner")){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
            else if(!type || (type !== "loan" && type !== "transfer" && type !== "all")){
                set.status = 400
                return {
                    msg: "search and type is required or wrong format"
                }
            }

            const {error, transactions} = await ListTransactionByCondition(search!, type)
            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "Failed to list transaction",
                    transactions: null
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                transactions: transactions
            }

        },
        ValidateManagerReport
    );
