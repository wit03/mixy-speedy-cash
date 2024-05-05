import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { InsertLoanUsecase } from "../../loan/loan.useCase";
import { InsertLoanType } from "../../loan/loan.type";


const ValidateLoan = {
    body:t.Object({
        loanType: t.String({
            minLength: 2
        }),
        loanAmount: t.Numeric({
            minLength: 2
        }),
        interestRate: t.Numeric({
            minLength: 2
        }),
        installmentLength: t.Number({
            minimum: 0,
        })
    }), 
    error({ error }: {error:any}) {
        return {
            msg: error
        }
    },
}

export const CreateLoan = new Elysia()
    .use(isAuthenticated)
    .post("/create-loan",
        async function CreateLoan({
            set,
            body,
            cookie: { currentAccount },
            customerDecrypt
        }) {

            if(!customerDecrypt || !customerDecrypt.customerId){
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }

            if(body.loanType !== "normal" && body.loanType !== "special"){
                set.status = 400
                return {
                    msg: "Loan type is incorrect format",
                }
            }
            
            const {error, loan, loanPayment, resDeposit} = await InsertLoanUsecase(body as InsertLoanType, String(currentAccount.value), customerDecrypt.customerId)
            if(error !== undefined){
                set.status = 400
                return {
                    msg:error || "",
                    loan: undefined,
                    loanPayment: undefined,
                    deposit: undefined,
                }
            }
            else {
                set.status = 200
                return {
                    msg:"Ok",
                    loan: loan,
                    loanPayment: loanPayment,
                    deposit: resDeposit,
                }
            }

        },
       ValidateLoan
);
