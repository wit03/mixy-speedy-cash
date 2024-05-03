import { Context, Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { HandleTransferBalance } from "../../account/account.Usecase";


const ValidateTransferBalance = {
    body: t.Object({
        // reciever represent accountId of reciever
        reciever: t.String({
            minLength: 2,
        }),
        amount: t.Number({
            minimum: 0,
        }),
       
    }),
    error({ code, set, error }: { code: string, set: Context["set"], error: any }) {
        return {
            msg: error
        }
        // case "VALIDATION":
        //     set.status = 400
        //     return {
        //         msg: error
        //     }
    },
}

export const transferBalance = new Elysia()
    .use(isAuthenticated)
    .post(
        "/transfer-balance",
        async function TransferBalanceHttpHandler({
            body,
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


            const { customerId: senderCustomerId } = customerDecrypt
            const { amount, reciever:recieverAccountId } = body
            console.log(currentAccount.value)
            const { error, senderData, recieverData } = await HandleTransferBalance(senderCustomerId, recieverAccountId, currentAccount.value.toString(), amount)
            if (error !== undefined || senderData === undefined || recieverData === undefined) {
                set.status = 400
                return {
                    msg: error || "failed to transfer the money"
                }
            }
            set.status = 200
            return {
                msg: "transfer money success",
                balanceLeft: senderData.balance,
                senderData: senderData,
                recieverData: recieverData
            }

            // const {} = await HandleTransferBalance()


        },
        ValidateTransferBalance
    );
