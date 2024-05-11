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
        pin: t.String({
            minLength: 6,
            maxLength: 6,
        })
    }),
    error({ code, set, error }: { code: string, set: Context["set"], error: any }) {
        return {
            msg: error
        }
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
            cookie: { currentAccount },
        }) {

            if (!customerDecrypt || !customerDecrypt.customerId || !currentAccount.value) {
                set.status = 401
                return {
                    msg: "Unauthorized",
                    balanceLeft: null,
                    senderData: null,
                    recieverData: null,
                }
            }
            
            const { customerId: senderCustomerId } = customerDecrypt
            const { amount, reciever: recieverAccountId, pin } = body
            
            const { error, senderData, recieverData } = await HandleTransferBalance(senderCustomerId, recieverAccountId, currentAccount.value.toString(), amount, pin)
            if (error !== undefined || senderData === undefined || recieverData === undefined) {
                set.status = 400
                return {
                    msg: error || "failed to transfer the money",
                    balanceLeft: null,
                    senderData: null,
                    recieverData: null,
                }
            }
            set.status = 200
            return {
                msg: "transfer money success",
                balanceLeft: senderData.balance,
                senderData: senderData,
                recieverData: recieverData
            }


        },
        ValidateTransferBalance
    );
