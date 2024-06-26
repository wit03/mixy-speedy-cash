import { $Enums } from "@prisma/client";
import { db } from "..";
import GenerateUniqueAccountId from "../utils/genId";

// ถอนเงิน
// WithdrawBalance -> decrement the balance
// sender is an owner of the account
export async function WithdrawBalanceRepo(senderCustomerId: string, amount: number, currentAccount: string) {
    try {
        return await db.account.update({
            where: {
                accountId: currentAccount,
                customerId: senderCustomerId
            },
            data: {
                balance: { decrement: amount }
            },
            select: {
                customerId: true,
                accountId: true,
                balance: true,
                customer:{
                    select:{
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
    } catch (_) {
        return undefined
    }
}

// โอนเงิน
// WithdrawBalance -> increment the balance
// reciever is an owner of the account
export async function DepositBalanceRepo(recieverAccountId: string, amount: number) {
    try {
        return await db.account.update({
            where: {
                accountId: recieverAccountId,
            },
            data: {
                balance: { increment: amount }
            },
            select: {
                customerId: true,
                accountId: true,
                balance: true,
                customer:{
                    select:{
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
    } catch (error) {
        return undefined
    }
}

// export async function FindAccountIdByCustomerId(customerId:string) {
//     return await db.account.findFirst({
//         where:{
//             CustomerId:customerId
//         },
//         select:
//     })
// }
export async function InsertAccountRepo(CustomerId: string, pin: string, AccountType: $Enums.AccountType, balance:number=1000) {
    try {
        return await db.account.create({
            data: {
                accountId: GenerateUniqueAccountId(),
                accountStatus: "inUse",
                balance: balance,
                accountType: AccountType,
                customerId: CustomerId,
                pin: pin,
            },
            select: {
                accountId: true,
                accountStatus: true,
                balance: true,
                accountType: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindOldestAccountIdByCustomerId(customerId: string) {
    try {
        return await db.account.findFirst({
            where: {
                customerId: customerId,
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                accountId: true,
                balance: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindAccountDataRepo(senderCustomerId: string, accountId: string) {
    try {
        return await db.account.findFirst({
            where: {
                customerId: senderCustomerId,
                accountId: accountId,
            },
            select: {
                accountId: true,
                balance: true,
                pin: true
            }
        })
    } catch (_) {
        return undefined
    }
}


export async function FindManyAccountRepo(limit: number, skip: number) {
    try {
        return await db.account.findMany({
            skip: skip,
            take: limit,
            select: {
                accountId: true,
                customer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
                    }
                }
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindCustomerManyAccountsRepo(customerId:string) {
    try {
        return await db.account.findMany({
            where:{
                customerId: customerId
            },
            select: {
                accountId: true,
                createdAt: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindAccountByIdAndCustomer(customerId:string, accountId:string) {
    try {
        return await db.account.findFirst({
            where:{
                accountId: accountId,
                customerId: customerId,
            },
            select: {
                accountId: true,
                customerId: true
            }
        })
    } catch (err) {
        return undefined
    }
}


export async function FindManyAccountDataByCustomerId(customerId:string) {
    try {
        return await db.account.findMany({
            where:{
                customerId: customerId
            },
            select:{
                accountId: true,
                createdAt: true,
                balance: true,
            },
            orderBy:{
                createdAt:"desc"
            }
        })

    } catch (_) {
        return undefined
    }
}


export async function FindAccountBalanceRepo(accountId:string) {
    try {
        return await db.account.findFirst({
            where:{
                accountId: accountId
            },
            select:{
                balance: true,
                accountId: true
                
            }
        })
    } catch (_) {
        return undefined
    }
}


export async function FindAccountNameRepo(accountId:string) {
    try {
        return await db.account.findFirst({
            where:{
                accountId: accountId
            },
            select:{
                accountId:true,
                customer:{
                    select:{
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })
    } catch (_) {
        return undefined
    }
}