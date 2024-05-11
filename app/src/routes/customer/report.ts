import { Elysia } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { FindReportUsecase } from "../../transaction/transaction.Usecase";


export const report = new Elysia()
    .use(isAuthenticated)
    .get("/get-report",
        async function SignInHttpHandler({
            set,
            customerDecrypt,
            cookie: {currentAccount},
        }) {

            if (!customerDecrypt || !customerDecrypt.customerId || !currentAccount.value) {
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }

            const {error, moneyIn, moneyOut, moneyInLastSixMonth, moneyOutLastSixMonth} = await FindReportUsecase(customerDecrypt.customerId, currentAccount.value.toString())
            if(error !== undefined){
                set.status = 400
                return {
                    msg: error || "Failed to get moneyIn moneyOut data",
                    moneyIn: null,
                    moneyOut: null,
                    lastSixMonth: null
                }
            }
            
            // if sum is null let the value be 0
            moneyIn._sum.amount = moneyIn._sum.amount === null ? 0 : moneyIn._sum.amount 
            moneyOut._sum.amount = moneyOut._sum.amount === null ? 0 : moneyOut._sum.amount 
            set.status = 200
            return {
                msg: "ok",
                moneyIn: moneyIn,
                moneyOut: moneyOut,
                moneyInLastSixMonth: moneyInLastSixMonth,
                moneyOutLastSixMonth: moneyOutLastSixMonth,
            }

        },
    );
