import { Elysia, t } from "elysia";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { EmployeeApproveLoanUsecase } from "../../employee/employee.Usecase";


const ValidateSignin = {
    body: t.Object({
        loanId: t.String({
            minLength: 2,
        }),
        status: t.String({
            minLength: 2,
        }),
        type: t.String({
            default: "normal"
        })
    }),
    error({ code,error }: { code: string, error:any }) {
        switch (code) {
            case 'P2002':
                return {
                    msg: 'Email must be unique'
            }
            default:
                return {
                    msg: error || "Failed to do the action"
                }
        }
    },
}

export const approveLoan = new Elysia()
    .use(isEmployeeAuthenticated)
    .patch("/patch-status-loan",
        async function ApproveLoanHttpHandler({
            body,
            set,
            employeeDecrypt,
        }) {
            if(!employeeDecrypt || (employeeDecrypt.position !== "manager" && employeeDecrypt.position !== "owner")){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }
            else if(body.status !== "waiting" && body.status !== "onProcess" && body.status !== "inDebt" && body.status !== "decline"){
                set.status = 400;
                return {
                    msg:"Status incorrect type"
                }
            }
            else if(body.type !== "normal" && body.type !== "special"){
                set.status = 400;
                return {
                    msg:"Loan Type incorrect type"
                }
            }
            const {error, deposit, loan, loanPayment, } = await EmployeeApproveLoanUsecase(body.loanId, body.status, body.type)  
            if(error !== undefined){
                set.status = 400;
                return {
                    msg: error || "Failed to approve loan"
                }
            }
            return {
                msg: "Ok",
                deposit: deposit,
                loan: loan,
                loanPayment: loanPayment,
            }

          
        },
        ValidateSignin
    );
