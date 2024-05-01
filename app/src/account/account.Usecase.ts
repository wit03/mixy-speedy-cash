import { InsertTransaction } from "../transaction/transaction.Repository";
import { DepositBalanceRepo, WithdrawBalanceRepo } from "./account.Repository";

export async function HandleTransferBalance(sender:string, reciever:string,  amount:number) {
 
    // decrement balance of sender first
    const resultWithDraw = await WithdrawBalanceRepo(sender, amount)
    // if there is no result return an error
    if(!resultWithDraw){
        return {
            error:"Withdraw sender balance failed",
            data: undefined
        }
    }
    
    // increment balance of reciever
    const resultDeposit = await DepositBalanceRepo(reciever, amount)
    if(!resultDeposit){
        // if increment balance reciever failed
        // increment the balance of sender back
        const resultWithDraw = await DepositBalanceRepo(sender, amount)
        
        if(!resultWithDraw){
            console.error("fatal error here transfer failed and can't increment the balance of sender back")
        }
        
        return {
            error:"Deposit reciever balance failed",
            data: undefined
        }
    }
    
    
    
    // if everything success create a transaction
    const resultTransaction = await InsertTransaction(sender, reciever, amount)
    if(!resultTransaction){
        // if create transaction is failed
        // decrement balance reciever
        // increment balance sender
        const [resWithDraw, resDeposit] = await Promise.all([
            WithdrawBalanceRepo(reciever, amount),
            DepositBalanceRepo(sender, amount)
        ]);
        
        
        if(!resWithDraw || !resDeposit){
            console.error("fatal error here transfer failed and can't increment balance sender and can't decrement balance reciever")
        }
        
        return {
            error:"Create transaction failed",
            data: undefined
        }
        
    }


}
