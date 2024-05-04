import { db } from "..";

export async function InsertTransactionRepo(senderAccountId:string, recieverAccountId:string,  amount:number, detail: string = "") {
    return await db.transaction.create({
        data:{
            amount: amount,
            reciever:recieverAccountId,
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
                AccountReciever:{
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


// for know the amount of money in
export async function FindMoneyIn(accountId:string) {
    try {
        return await db.transaction.aggregate({
            where: {
                reciever: accountId
            },
            _sum:{
                amount: true
            }
        });       
    } catch (_) {
        return undefined
    }
}

// for know the amount of money out
export async function FindMoneyOut(accountId:string) {
    try {
        return await db.transaction.aggregate({
            where: {
                sender: accountId
            },
            _sum:{
                amount: true
            }
        });       
    } catch (_) {
        return undefined
    }
}

export async function FindLastMoneyInDependOnTime(accountId:string, time:Date) {
    try {
        
        return await db.transaction.findMany({
            where: {
              AND: [
                { reciever: accountId },
                { transactionDate: {
                    gte: time.toISOString(),
                }}
              ]
            },
            select:{
                amount: true,
                transactionDate: true
            }
          });
    } catch (_) {
        return undefined
    }
}

export async function FindLastMoneyOutDependOnTime(accountId:string, time:Date) {
    try {
        return await db.transaction.findMany({
            where: {
              AND: [
                { sender: accountId },
                { transactionDate: {
                    gte: time.toISOString(),
                }}
              ]
            },
            select:{
                amount: true,
                transactionDate: true
            }
        });
    } catch (_) {
        return undefined
    }
}