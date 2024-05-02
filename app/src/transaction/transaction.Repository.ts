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

export async function FindManyTransactions(limit: number, skip: number) {
    try {
        return await db.transaction.findMany({
            skip: skip,
            take: limit,
            select: {
                amount: true,
                detail: true,
                transactionDate: true,
                transactionId: true,
                AccountSender:{
                    select:{
                        customer:{
                            select:{
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                AccountReceiver:{
                    select:{
                        customer:{
                            select:{
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
            },
            
        })
    } catch (_) {
        return undefined
    }
}

