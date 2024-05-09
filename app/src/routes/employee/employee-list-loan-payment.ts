import { Elysia, t } from "elysia";
import { isEmployeeAuthenticated } from "../../middleware/authen";
import { FindLoanPaymentRepo } from "../../loan/loan.repository";

const ValidateManagerReport = {
    query: t.Object({
        loanId: t.String({ minLength: 2 }),

    }),
    error({ error }: {  error:any }) {
        return {
            msg: error
        }
    },
}

export const listLoanPayment = new Elysia()
    .use(isEmployeeAuthenticated)
    .get("/list-loan-payments",
        async function listLoanHttpHandler({
            set,
            employeeDecrypt,
            query:{loanId}
        }) {
            if(!employeeDecrypt){
                set.status = 401;
                return {
                    msg: "Unauthorized"
                }
            }

            const res = await FindLoanPaymentRepo(loanId)
            if(!res){
                set.status = 400
                return {
                    msg:  "Failed to list loan payemnts",
                    loanPayments: null
                }
            }

            set.status = 200
            return {
                msg: "Ok",
                loanPayments: res,
            }

        },
        ValidateManagerReport
    );
