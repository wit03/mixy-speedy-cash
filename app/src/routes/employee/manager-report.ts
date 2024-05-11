import { Elysia, t } from "elysia";
import { ManagerReport } from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";


const ValidateManagerReport = {
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const managerReport = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/manager-report",
        async function ManagerReportHttpHandler({
            set,
            employeeDecrypt
        }) {

            if(!employeeDecrypt || (employeeDecrypt.position !== "manager" && employeeDecrypt.position !== "owner")){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
            const {error, loanPaymentProfit, totalAccounts, totalCustomers} = await ManagerReport()
            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "Failed to get manager report"
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                loanPaymentProfit:loanPaymentProfit, 
                totalAccounts:totalAccounts, 
                totalCustomers:totalCustomers
            }

        },
        ValidateManagerReport
    );
