import { db } from "..";

async function FindCustomerByEmail(customerId:string, accountId:string, addBalance:number) {
    return await db.account.findFirst({
        where:{
            AccountId: accountId,
            CustomerId: customerId
        },
        
    })
}
