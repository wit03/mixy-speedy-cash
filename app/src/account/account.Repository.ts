import { $Enums } from "@prisma/client";
import { db } from "..";


// ถอนเงิน
// WithdrawBalance -> decrement the balance
// sender is an owner of the account
export async function WithdrawBalanceRepo(sender:string, amount:number) {
    return await db.account.update({
        where:{
            AccountId: sender,
        },
        data:{
            Balance: {decrement: amount}
        },
        select:{
            CustomerId:true, 
            AccountId: true,
            Balance: true,
        }
    })
}

// โอนเงิน
// WithdrawBalance -> increment the balance
// reciever is an owner of the account
export async function DepositBalanceRepo(reciever:string, amount:number) {
    return await db.account.update({
        where:{
            AccountId: reciever,
        },
        data:{
            Balance: {increment: amount}
        },
        select:{
            CustomerId:true, 
            AccountId: true,
            Balance: true,
        }
    })
}

// export async function FindAccountIdByCustomerId(customerId:string) {
//     return await db.account.findFirst({
//         where:{
//             CustomerId:customerId
//         },
//         select:
//     })
// }
export async function InsertAccountRepo(CustomerId:string, AccountType:$Enums.AccountType) {
    return await db.account.create({
        data:{
            AccountId:new Date().valueOf().toString(),
            AccountStatus: "InUse",
            Balance: 1000,
            AccountType: AccountType,
            CustomerId: CustomerId,
        },
        select:{
            AccountId:true,
            AccountStatus:true,
            Balance:true,
            AccountType:true,
        }
    })
}

export async function FindOldestAccountIdByCustomerId(customerId:string) {
    return await db.account.findFirst({
        where:{
            CustomerId: customerId,
        },
        orderBy:{
            CreatedAt:  "desc"
        },
        select:{
            AccountId:true
        }
    })
}