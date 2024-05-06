import { Elysia, t } from "elysia";
import { jwtAccessSetup } from "../setup";
import { isAuthenticated } from "../../middleware/authen";
import { CustomerPayLoanUsecase } from "../../loan/loan.useCase";


const ValidatePayLoan = {
    body: t.Object({
        loanId: t.String({
            minLength: 2,
        }),
        loanPaymentId: t.String({
            minLength: 2,
        }),
        pin: t.String({
            minLength: 6,
            maxLength: 6,
        }),
    }),
    error({ error }: {error:any}) {
       return {
            msg:error
        }
    },
}
export const CustomerPayLoan  = new Elysia()
    .use(isAuthenticated)
    .patch("/pay-loan",
        async function CustomerPayLoanHttpHandle({
            body,
            set,
            cookie: { currentAccount },
            customerDecrypt
        }) {

            if(!customerDecrypt || !customerDecrypt.customerId){
                set.status = 401
                return {
                    msg: "Unauthorized",
                    loanPayment: null,
                    transaction: null,
                }
            }


            const {error, loanPayment, transaction} = await CustomerPayLoanUsecase(body.loanId, body.loanPaymentId, customerDecrypt.customerId, String(currentAccount.value), body.pin)
            if(error){
                set.status = 400
                return {
                    msg: error || "Faield to update loan payment",
                    loanPayment: null,
                    transaction: null,
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                loanPayment: loanPayment,
                transaction: transaction,
            }

        },
        ValidatePayLoan
    );
