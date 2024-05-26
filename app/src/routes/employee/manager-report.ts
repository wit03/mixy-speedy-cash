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
            const {error, 
                loanPaymentProfit, 
                totalAccounts, 
                totalCustomers, 
                totalEmployees, 
                totalLoans, 
                totalLoansIndebt, 
                totalLoansProcess,
                latestLoanPaid
            } = await ManagerReport()
            
            
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
                totalAccounts:totalAccounts || 0, 
                totalCustomers:totalCustomers || 0,
                totalEmployees: totalEmployees || 0,
                totalLoans: totalLoans || 0,
                totalLoansIndebt: totalLoansIndebt || 0,
                totalLoansProcess: totalLoansProcess || 0,
                latestLoanPaid: latestLoanPaid
            }

        },
        ValidateManagerReport
    );
