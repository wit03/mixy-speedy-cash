import { Elysia, t } from "elysia";
import { CountAndSumTransactions } from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";


const ValidateManagerReport = {
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const countAndSumTransaction = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/agg-transactions",
        async function CountAndSumTransactionHttpHandler({
            set,
            employeeDecrypt
        }) {

            if(!employeeDecrypt){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
            const {error, countAndSumTransactions} = await CountAndSumTransactions()
            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "Failed to get manager report"
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                countAndSumTransactions:countAndSumTransactions, 
            }

        },
        ValidateManagerReport
    );
