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
        currentAccount: t.String({
            minLength: 2,
        })
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
            customerDecrypt
        }) {

            if (!customerDecrypt || !customerDecrypt.CustomerId) {
                set.status = 401
                return {
                    msg: "Unauthorized"
                }
            }


            const { CustomerId: senderCustomerId } = customerDecrypt
            const { amount, reciever:recieverAccountId, currentAccount } = body

            const { error, senderData } = await HandleTransferBalance(senderCustomerId, recieverAccountId, currentAccount, amount)
            if (error !== undefined || senderData === undefined) {
                set.status = 400
                return {
                    msg: error || "failed to transfer the money"
                }
            }
            set.status = 200
            return {
                msg: "transfer money success",
                currentCustomer: senderData
            }

            // const {} = await HandleTransferBalance()


        },
        ValidateTransferBalance
    );
