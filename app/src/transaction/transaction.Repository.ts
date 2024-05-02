import { db } from "..";

export async function InsertTransaction(senderAccountId:string, recieverAccountId:string,  amount:number, detail: string = "") {
    return await db.transaction.create({
        data:{
            amount: amount,
            receiver:recieverAccountId,
            sender:senderAccountId,
            detail: detail
        }
    })
}