import { InsertTransaction } from "../transaction/transaction.Repository";
import { DepositBalanceRepo, FindAccountDataRepo, FindManyAccountRepo, WithdrawBalanceRepo } from "./account.Repository";

export async function HandleTransferBalance(senderCustomerId:string, recieverAccountId:string, currentAccount:string,  amount:number) {
 
    const currentAccountData = await FindAccountDataRepo(senderCustomerId, currentAccount);

    if(!currentAccountData){
        return {
            error:"Can't find your account data",
            senderData: undefined
        }
    }
    else if(currentAccountData.Balance < amount){
        return {
            error:"Your account can't make a transfer, not enough money",
            senderData: undefined
        }
    }

    // decrement balance of sender first
    const resultWithDraw = await WithdrawBalanceRepo(senderCustomerId, amount, currentAccountData.AccountId)
    // if there is no result return an error
    if(!resultWithDraw){
        return {
            error:"Withdraw sender balance failed",
            senderData: undefined
        }
    }
    
    // increment balance of reciever
    const resultDeposit = await DepositBalanceRepo(recieverAccountId, amount)
    if(!resultDeposit){
        // if increment balance reciever failed
        // increment the balance of sender back
        const resultWithDraw = await DepositBalanceRepo(currentAccountData.AccountId, amount)
        
        if(!resultWithDraw){
            console.error("fatal error here transfer failed and can't increment the balance of sender back")
        }
        
        return {
            error:"Deposit reciever balance failed",
            senderData: undefined
        }
    }
    
    
    // if everything success create a transaction
    const resultTransaction = await InsertTransaction(currentAccountData.AccountId, recieverAccountId, amount, `Tranfer money from ${currentAccount} to ${recieverAccountId}`)
    if(!resultTransaction){
        // if create transaction is failed
        // decrement balance reciever
        // increment balance sender
        const [resWithDraw, resDeposit] = await Promise.all([
            WithdrawBalanceRepo(recieverAccountId, amount, currentAccount),
            DepositBalanceRepo(currentAccountData.AccountId, amount)
        ]);
        
        
        if(!resWithDraw || !resDeposit){
            console.error("fatal error here transfer failed and can't increment balance sender and can't decrement balance reciever")
        }
        
        return {
            error:"Create transaction failed",
            senderData: undefined
        }
        
    }

    return {
        error: undefined, 
        senderData:resultWithDraw
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
