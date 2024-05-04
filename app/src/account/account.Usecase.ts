import { InsertTransactionRepo } from "../transaction/transaction.Repository";
import { DepositBalanceRepo, FindAccountDataRepo, FindManyAccountRepo, InsertAccountRepo, WithdrawBalanceRepo } from "./account.Repository";

export async function HandleTransferBalance(senderCustomerId:string, recieverAccountId:string, currentAccount:string,  amount:number, pin:string) {
 
    const currentAccountData = await FindAccountDataRepo(senderCustomerId, currentAccount);

    if(!currentAccountData){
        return {
            error:"Can't find your account data",
            senderData: undefined
        }
    }
    else if(currentAccountData.balance < amount){
        return {
            error:"Your account can't make a transfer, not enough money",
            senderData: undefined
        }
    }
    else if(!await Bun.password.verify(pin, currentAccountData.pin, "bcrypt")){
        return {
            error:"Pin is wrong",
            senderData: undefined
        }
    }

    // decrement balance of sender first
    const resultWithDrawSender = await WithdrawBalanceRepo(senderCustomerId, amount, currentAccountData.accountId)
    // if there is no result return an error
    if(!resultWithDrawSender){
        return {
            error:"Withdraw sender balance failed",
            senderData: undefined
        }
    }
    
    // increment balance of reciever
    const resultDepositReciever = await DepositBalanceRepo(recieverAccountId, amount)
    if(!resultDepositReciever){
        // if increment balance reciever failed
        // increment the balance of sender back
        const resultWithDrawSender = await DepositBalanceRepo(currentAccountData.accountId, amount)
        
        if(!resultWithDrawSender){
            console.error("fatal error here transfer failed and can't increment the balance of sender back")
        }
        
        return {
            error:"Deposit reciever balance failed",
            senderData: undefined,
            recieverData: undefined,
        }
    }
    
    // if everything success create a transaction
    const resultTransaction = await InsertTransactionRepo(currentAccountData.accountId, recieverAccountId, amount, `Tranfer money from ${currentAccount} to ${recieverAccountId}`)
    if(!resultTransaction){
        // if create transaction is failed
        // decrement balance reciever
        // increment balance sender
        const [resWithDraw, resDeposit] = await Promise.all([
            WithdrawBalanceRepo(recieverAccountId, amount, currentAccount),
            DepositBalanceRepo(currentAccountData.accountId, amount)
        ]);
        
        
        if(!resWithDraw || !resDeposit){
            console.error("fatal error here transfer failed and can't increment balance sender and can't decrement balance reciever")
        }
        
        return {
            error:"Create transaction failed",
            senderData: undefined,
            recieverData: undefined,
        }
    }
    
    //@ts-ignore
    delete resultDepositReciever.balance;
    //@ts-ignore
    delete resultDepositReciever.customerId;
    //@ts-ignore
    delete resultWithDrawSender.customerId;
    return {
        error: undefined, 
        senderData:resultWithDrawSender,
        recieverData: resultDepositReciever,
    }
    
}


export async function ListAllAccounts(limit:number, skip:number) {
    const resAccounts = await FindManyAccountRepo(limit, skip)

    if(!resAccounts){
        return {
            error: "There are some error ouccur when try to find an accounts for you",
            accounts: undefined
        }
    }

    return {
        error: undefined,
        accounts: resAccounts
    }
}


export async function InsertAccount(customerId: string, pin:string) {
    
    let hashedPin = await Bun.password.hash(pin, {
        algorithm:"bcrypt",
        cost: 4
    })

    const resAccount = await InsertAccountRepo(customerId, hashedPin, "deposit", 1000);

    if(!resAccount){
        return {
            error: "Failed to isnert an account to database",
            account: undefined
        }
    }
    
    return {
        error: undefined,
        account: resAccount
    }

}