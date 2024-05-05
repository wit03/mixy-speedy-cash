import { LoanPayment } from "@prisma/client";
import { DeleteLoanPaymentRepo, DeleteLoanRepo, FindLoanPaymentById, InsertLoanRepo, InsertManyLoanPayment, ListLoanByAccountIdRepo, ListLoanPaymentRepo, UpdateLoanPayment } from "./loan.repository";
import { InsertLoanType } from "./loan.type";
import { DepositBalanceRepo, FindAccountByIdAndCustomer, FindAccountDataRepo, WithdrawBalanceRepo } from "../account/account.Repository";
import { InsertTransactionRepo } from "../transaction/transaction.Repository";
import { bankAccountId } from "../utils/bank";

export async function InsertLoanUsecase(body: InsertLoanType, accountId:string, customerId:string) {
    
    
    // check first if accountId and customerId is the same owner
    const checkedCustomerId = await FindAccountByIdAndCustomer(customerId, accountId);
    if(!checkedCustomerId || checkedCustomerId.customerId !== customerId){
        return {
            error: "unathorized",
            loan: undefined,
            loanPayment: undefined,
            resDeposit: undefined
        }
    }


    const nextMonth = new Date();
    // calculate end month of the loan
    let endMonth = nextMonth
    endMonth.setMonth(endMonth.getMonth() + body.installmentLength)
    const loanRes = await InsertLoanRepo(body, endMonth, accountId)
    if(loanRes === undefined) {
        return {
            error: "Failed to create loan",
            loan: undefined,
            loanPayment: undefined,
            resDeposit: undefined
        }
    }
    
    // calculate how much each loan payment should be paid
    const loanPayments:Omit<LoanPayment, "loanPaymentId" | "createdAt" | "updatedAt" | "paidDate">[] = []
    const interestPercent = body.interestRate; 
    const loanAmount = body.loanAmount;
    const paymentAmount = (loanAmount * 3) / 100
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1); 
    
    for (let i = 0; i < body.installmentLength; i++) {
        loanPayments.push({
            interestPercent: interestPercent, 
            loanId: loanRes.loanId,
            paidAmount: 0,
            paymentAmount: paymentAmount,
            principalAmount: body.loanAmount,
            scheduledPaymentDate: nextMonth,
            paidStatus: "onProcess",
        })
        nextMonth.setMonth(nextMonth.getMonth() + 1);
    }
    
    // insert loan payment
    const loanPaymentRes = await InsertManyLoanPayment(loanPayments)
    // if insert loan payment failed we going to delete loan repo
    if(loanPaymentRes === undefined){
        await DeleteLoanRepo(accountId)
        return {
            error: "Failed to create loan",
            loan: undefined,
            resDeposit: undefined,
            loanPayment: undefined
        }
    }
    
    // โอนเงิน
    const resDeposit =  await DepositBalanceRepo(accountId, body.loanAmount)
    // if failed to add balance to account we going to delete the loan and loan payment
    if(resDeposit === undefined){
        await DeleteLoanRepo(accountId)
        await DeleteLoanPaymentRepo(accountId)
        return {
            error: "Failed to create loan",
            loan: undefined,
            loanPayment: undefined,
            resDeposit: undefined
        }
    }
    
    return {
        error: undefined,
        loan: loanRes,
        loanPayment: loanPaymentRes,
        resDeposit: resDeposit
    }
}



export async function ListLoans(accountId:string) {

    const listLoanRes = await ListLoanByAccountIdRepo(accountId)
    if(listLoanRes === undefined){
        return {
            error: "List loan account by Id failed",
            listLoan: undefined,
        }
    }

    return {
        error: undefined,
        listLoan: listLoanRes
    }

}


export async function ListLoanPaymentsUsecase(loanId:string) {

    const listLoanPaymentRes = await ListLoanPaymentRepo(loanId)
    if(listLoanPaymentRes === undefined){
        return {
            error: "List loan payment failed",
            loanPayments: undefined,
        }
    }

    return {
        error: undefined,
        loanPayments: listLoanPaymentRes
    }

}




export async function CustomerPayLoanUsecase(loanId:string, loanPaymentId:string, customerId:string, accountId:string, pin:string) {
    
    // check first if accountId and customerId is the same owner and 
    // check if balance is enough for paying the loan payment
    const currentAccountData = await FindAccountDataRepo(customerId, accountId);
    if(!currentAccountData){
        return {
            error: "unathorized",
            loanPayment: undefined,
            transaction: undefined,
        }
    } 
    // verify pin
    else if(!await Bun.password.verify(pin, currentAccountData.pin, "bcrypt")){
        return {
            error:"Pin is wrong",
            loanPayment: undefined,
            transaction: undefined,
        }
    }
    
    const loanPayment = await FindLoanPaymentById(loanId, loanPaymentId)
    if(!loanPayment){
        return {
            error: "Failed to find your loan paymentId",
            loanPayment: undefined,
            transaction: undefined,
        }
    }
    // if balance in account is not enough return error
    else if(currentAccountData.balance < loanPayment.paymentAmount){
        return {
            error:"Your account can't make a transfer, not enough money",
            loanPayment: undefined,
            transaction: undefined,
        }
    }
    
    // withdraw balance from the account first
    const withdrawRes = await WithdrawBalanceRepo(customerId, loanPayment.paymentAmount, accountId)
    if(!withdrawRes){
        return {
            error: "Failed to find your loan paymentId",
            loanPayment: undefined,
            transaction: undefined,
        }
    }
    
    // update the loan payment data
    const loanPaymentUpdateRes = await UpdateLoanPayment(loanPaymentId, loanId, loanPayment.paymentAmount, new Date().toISOString(), "paid")
    if(!loanPaymentUpdateRes){
        const _ = await DepositBalanceRepo(accountId, loanPayment.paymentAmount)
        return {
            error: "Update loan payment status to paid error",
            loanPayment: undefined,
            transaction: undefined,
        }
    }

    const resultTransaction = await InsertTransactionRepo(currentAccountData.accountId, bankAccountId, loanPayment.paymentAmount, `Tranfer money from ${currentAccountData.accountId} to ${"bank"}`, "loan")
    if(!resultTransaction){
        await UpdateLoanPayment(loanPaymentId, loanId, 0, null, "onProcess")
        await DepositBalanceRepo(accountId, loanPayment.paymentAmount)
        return {
            error: "Failed to insert transaction"
        }
    }

    return {
        error: undefined,
        loanPayment: loanPaymentUpdateRes,
        transaction: resultTransaction,
    }



}
