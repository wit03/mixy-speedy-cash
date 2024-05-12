import { $Enums } from "@prisma/client";
import { db } from "..";
import { TransactionSearchCondition } from "../employee/employee.type";
import { TransactionSearchCondition } from "../employee/employee.type";

export async function InsertTransactionRepo(senderAccountId:string, recieverAccountId:string,  amount:number, detail: string = "", transactionType:$Enums.TransactionType) {
   try {
    return await db.transaction.create({
        data:{
            amount: amount,
            reciever:recieverAccountId,
            sender:senderAccountId,
            detail: detail,
            transactionType: transactionType
        }
    })
   } catch (_) {
        return undefined
   }
}


export async function FindManyTransactionsFromAccount(limit: number, skip: number, accountId:string) {
export async function FindManyTransactionsFromAccount(limit: number, skip: number, accountId:string) {
    try {
        return await db.transaction.findMany({
            where:{
                sender: accountId
            },
            where:{
                sender: accountId
            },
            skip: skip,
            take: limit,
            select: {
                amount: true,
                detail: true,
                transactionDate: true,
                transactionId: true,
                accountSender:{
                accountSender:{
                    select:{
                        customer:{
                            select:{
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                accountReciever:{
                accountReciever:{
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
            orderBy:{
                transactionDate: "desc"
            }
            orderBy:{
                transactionDate: "desc"
            }
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

export async function CountAndSumTransactionRepo(): Promise<{ totalTransactions: number; amount: number } | undefined> {
    try {
        const counts = await db.$queryRaw<{totaltransactions: BigInt; amount: BigInt }[]>`
            SELECT
                (SELECT COUNT(*) FROM "Transaction") AS totaltransactions,
                (SELECT SUM("amount") FROM "Transaction") AS amount
        `;
        if (counts) {
            const totalTransactions = Number(counts[0].totaltransactions);
            const amount = Number(counts[0].amount);
            return { totalTransactions, amount };
        } else {
            return undefined;
        }
    } catch (_) {
        return undefined;
    }
}

export async function FindTransactionByConditionRepo(search:string, transactionType:TransactionSearchCondition) {
    try {
        let whereCondition: any = {
        };

        if(transactionType !== "all"){
            whereCondition.transactionType = transactionType
        }

        if (search.trim() !== "") {
            whereCondition.detail = {
                contains: search
            };
        }

        
        return await db.transaction.findMany({
            where: whereCondition,
            select:{
                transactionId: true,
                detail: true,
                accountReciever:{
                    select:{
                        customer:{
                            select:{
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                accountSender:{
                    select:{
                        customer:{
                            select:{
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                transactionType: true,
                amount: true,
                transactionDate: true,
                updatedAt: true,

            }
        });

    } catch (_) {
        return undefined
    }
}
