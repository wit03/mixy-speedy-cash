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