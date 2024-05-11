import { Elysia } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { ListLoans } from "../../loan/loan.useCase";


const ValidateLoan = {
    error({ error }: {error:any}) {
        return {
            msg: error
        }
    },
}

export const ListsLoan = new Elysia()
    .use(isAuthenticated)
    .get("/list-loans",
        async function ListsLoan({
            set,
            cookie: { currentAccount },
        }) {

            const {error, listLoan} = await ListLoans(String(currentAccount.value))
            if (error !== undefined){
                set.status = 400
                return {
                    msg:error || "List loan payment failed",
                    loans: null,
                }
            }

            return {
                msg:"Ok",
                loans: listLoan
            }
            
        },
       ValidateLoan
);
