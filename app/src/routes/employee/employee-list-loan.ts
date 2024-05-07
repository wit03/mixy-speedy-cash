import { Elysia, t } from "elysia";
import { EmployeeListLoanUsecase, ListTransactionByCondition } from "../../employee/employee.Usecase";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { ListLoanByTypeRepo } from "../../loan/loan.repository";


const ValidateManagerReport = {
    query: t.Object({
        status: t.String({
            default: "waiting"
        }),

    }),
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const listLoan = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/list-loans",
        async function listLoanHttpHandler({
            set,
            employeeDecrypt,
            query:{status}
        }) {
            if(!employeeDecrypt){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
            else if(!status || (status !== "waiting" && status !== "onProcess" && status !== "inDebt" && status !== "decline")){
                set.status = 400
                return {
                    msg: "status is required or wrong format"
                }
            } 

            const {error, loans} = await EmployeeListLoanUsecase(status)
            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "Failed to list transaction",
                    loanss: null
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                loans: loans
            }

        },
        ValidateManagerReport
    );
