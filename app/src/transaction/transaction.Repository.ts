import { db } from "..";

export async function InsertTransaction(sender:string, reciever:string,  amount:number) {
    return await db.transaction.create({
        data:{
            Amount: amount,
            Receiver:reciever,
            Sender:sender,
        }
    })
}