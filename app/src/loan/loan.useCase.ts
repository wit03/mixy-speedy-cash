import { LoanPayment } from "@prisma/client";
import { DeleteLoanPaymentRepo, DeleteLoanRepo, InsertLoanRepo, InsertManyLoanPayment, ListLoanByAccountIdRepo, ListLoanPaymentRepo } from "./loan.repository";
import { InsertLoanType } from "./loan.type";
import { DepositBalanceRepo } from "../account/account.Repository";

export async function InsertLoanUsecase(body: InsertLoanType, accountId:string) {
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

