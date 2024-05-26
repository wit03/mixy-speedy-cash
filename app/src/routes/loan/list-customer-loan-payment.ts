import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { ListLoanPaymentsUsecase } from "../../loan/loan.useCase";
import { ListCustomerLoanPaymentRepo } from "../../loan/loan.repository";


const ValidateLoan = {
    error({ error }: {error:any}) {
        return {
            msg: error
        }
    },
}

export const ListCustomerLoanPayments = new Elysia()
    .use(isAuthenticated)
    .get("/list-customer-loan-payments",
        async function ListLoanPayments({
            set,
            cookie: { currentAccount },
        }) {
            if(!currentAccount.value){
                set.status = 401
                return {
                    msg:"Unauthorized"
                }
            }
            const data = await ListCustomerLoanPaymentRepo(String(currentAccount.value))
            if (!data){
                set.status = 400
                return {
                    msg:"List all loan payment failed",
                    loanPayments: null,
                }
            }

            // const groupedPayments:any = {};
            // data.forEach(group => {
            //     group.loanPayments.forEach(payment => {
            //         const { loanId } = payment;
            //         if (!groupedPayments[loanId]) {
            //             groupedPayments[loanId] = [];
            //         }
            //         groupedPayments[loanId].push(payment);
            //     });
            // });
            let flattenedLoanPayments = data.flatMap(payment => payment.loanPayments);
            //@ts-ignore
            flattenedLoanPayments.sort((a, b) => new Date(a.scheduledPaymentDate) - new Date(b.scheduledPaymentDate));

            return {
                msg:"Ok",
                loanPayments: flattenedLoanPayments
            }
            
        },
       ValidateLoan
);
