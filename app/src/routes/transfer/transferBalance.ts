import { Elysia, t } from "elysia";
import { isAuthenticated } from "../../middleware/authen";
import { HandleTransferBalance } from "../../account/account.Usecase";


const ValidateTransferBalance = {
    body: t.Object({
        // reciever represent accountId of reciever
        reciever: t.String({
            minLength: 2,
        }),
        // sender represent accountId of sender
        sender: t.String({
            minLength: 2,
        }),
        amount: t.Number({
            minimum: 0,
        }),
    }),
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
            const {amount, reciever}  = body

            


            // const {} = await HandleTransferBalance()


        },
        ValidateTransferBalance
    );
