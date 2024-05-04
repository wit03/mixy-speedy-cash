import { LoanPayment } from "@prisma/client";
import { db } from "..";
import { InsertLoanType, InsertManyLoanPaymentType } from "./loan.type";


export async function ListLoanByAccountIdRepo(accountId:string) {
    try {
        return await db.loan.findMany({
            where:{
                accountId: accountId
            },
            select:{
                loanId: true,
                loanType: true,
                loanAmount: true,
                interestRate: true,
                loanStatus: true,
                endDate: true,
                startDate: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function ListLoanPaymentRepo(loanId:string) {
    try {
        return await db.loanPayment.findMany({
            where:{
                loanId: loanId
            },
            select:{
                loanId: true,
                loanPaymentId: true,
                scheduledPaymentDate: true,
                principalAmount: true,
                paymentAmount: true,
                interestPercent: true,
                paidAmount: true,
                paidDate: true,
                paidStatus: true,
                createdAt: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function InsertLoanRepo(body: InsertLoanType, endDate: Date, accountId: string) {
    try {
        return await db.loan.create({
            data:{
                endDate: endDate,
                interestRate: body.interestRate,
                loanAmount: body.loanAmount,
                loanStatus: "onProcess",
                loanType: body.loanType,
                accountId: accountId,
            },
            select:{
                loanId: true,
                startDate: true,
                endDate: true,
                interestRate: true,
                loanAmount: true,
                loanStatus: true,
                loanType: true,
                accountId: true,
            }
        })
    } catch (err) {
        return undefined
    }
}

export async function InsertManyLoanPayment(loans: InsertManyLoanPaymentType[]) {
    try {
        return await db.loanPayment.createMany({
                data: loans,
            },
        )
    } catch (_) {
        return undefined
    }   
}

export async function DeleteLoanRepo(loanId:string) {
    try {
        return await db.loan.delete({
            where:{
                loanId: loanId,
            }
        })

    } catch (_) {
        return undefined
    }
}
export async function DeleteLoanPaymentRepo(loanId:string) {
    try {
        return await db.loanPayment.deleteMany({
            where:{
                loanId: loanId
            }
        })

    } catch (_) {
        return undefined
    }
}