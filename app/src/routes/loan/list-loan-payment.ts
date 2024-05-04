import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { ListLoanPaymentsUsecase } from "../../loan/loan.useCase";


const ValidateLoan = {
    query: t.Object({
        loanId: t.String({
            minLength: 2
        }),
    }),
    error({ error }: {error:any}) {
        return {
            msg: error
        }
    },
}

export const ListLoanPayments = new Elysia()
    .use(isAuthenticated)
    .get("/list-loan-payments",
        async function ListLoanPayments({
            set,
            query
        }) {

            const {error, loanPayments} = await ListLoanPaymentsUsecase(query.loanId)
            if (error !== undefined){
                set.status = 400
                return {
                    msg:error || "List loan payment failed",
                    loanPayments: undefined,
                }
            }

            return {
                msg:"Ok",
                loanPayments: loanPayments
            }
            
        },
       ValidateLoan
);
