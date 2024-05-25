import { Elysia, t } from "elysia";
import { ListTransactionByCondition } from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { FindResponsibleEmployeeLoanRepo } from "../../loan/loan.repository";


const ValidateManagerReport = {
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const listLoanReponsible = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/employee-list-loans",
        async function listLoanReponsibleHttpHandler({
            set,
            employeeDecrypt,
        }) {
            if(!employeeDecrypt){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
          
            const data = await FindResponsibleEmployeeLoanRepo(employeeDecrypt.employeeId)
            if(!data){
                set.status = 400;
                return {
                    msg:"Failed to list responsible employee",
                    loans: null
                }
            }

            return {
                msg:"ok",
                loans: data
            }


        },
        ValidateManagerReport
    );
