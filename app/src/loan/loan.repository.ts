import { $Enums, LoanPayment } from "@prisma/client";
import { db } from "..";
import { InsertLoanType, InsertManyLoanPaymentType, SearchLoanStatus } from "./loan.type";


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
                responsibleEmployeeId: true,
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindLoanPaymentById(loanId:string, loanPaymentId:string) {
    try {
        return await db.loanPayment.findFirst({
            where:{
                loanId: loanId,
                loanPaymentId: loanPaymentId
            },
            select:{
                loanId: true,
                interestPercent: true,
                paymentAmount: true
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

export async function FindLoanDataWithLoanIdRepo(loanId:string) {
    try {
        return await db.loan.findFirst({
            where:{
                loanId: loanId
            },
            select:{
                loanId: true,
                loanStatus: true,
                startDate: true,
                endDate: true,
                loanAmount: true,
                interestRate: true,
                accountId: true
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function InsertLoanRepo(body: InsertLoanType, accountId: string) {
    try {
        return await db.loan.create({
            data:{
                interestRate: body.interestRate,
                loanAmount: body.loanAmount,
                loanStatus: "waiting",
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

// for customer paying loan
export async function UpdateLoanPayment(loanPaymentId: string, loanId:string, paidAmount:number, paidDate:string | null, paidStatus:$Enums.PaidStatus) {
    try {
        return await db.loanPayment.update({
            where:{
                loanPaymentId: loanPaymentId,
                loanId: loanId,
            },
            data:{
                paidAmount: paidAmount,
                paidDate: paidDate,
                paidStatus: paidStatus,
                updatedAt:paidDate ||  new Date().toISOString()
            },
            select:{
                loanPaymentId: true,
                loanId: true,
                paidAmount: true,
                paidDate: true,
                paidStatus: true,
            }
        })       
    } catch (_) {
        return undefined
    }
}


// for employee approvement loan
export async function UpdateLoanStatusRepo(loanId:string, status:$Enums.LoanStatus, startDate:Date | null, endDate:Date | null) {
    try {
        
        return await db.loan.update({
            where:{
                loanId: loanId,
            },
            data:{
                loanStatus: status,
                startDate: startDate,
                endDate: endDate
            },
            select:{
                loanId: true,
                loanStatus: true,
                startDate: true,
                endDate: true,
                loanAmount: true,
                interestRate: true,
                loanType: true
            }
        })

    } catch (_) {
        return undefined
    }
}

// for manager report
export async function FindProfitLoanRepo(time:Date) {
    try {
        return await db.loanPayment.findMany({
            where: {
              AND: [
                { 
                    createdAt: {
                       gte: time.toISOString(),
                    }
                },
                {
                    paidAmount:{
                        not: 0,
                    }
                }
              ]
            },
            select:{
                paidAmount: true,
                createdAt: true,
            }
          });

    } catch (_) {
        return undefined
    }
}

export async function ListLoanByTypeRepo(status:SearchLoanStatus) {
    try {

        let whereStatement = {}

        if(status !== "all"){
            whereStatement = {
                loanStatus: status   
            }
        }

        return await db.loan.findMany({
            where: whereStatement,
            select:{
                account:{
                    select:{
                        accountId: true,
                        customer:{
                            select:{
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                loanType: true,
                loanStatus: true,
                createdAt: true,
                loanAmount: true,
                loanId: true,
                interestRate: true,
                responsibleEmployeeId: true,
            },
            orderBy:{
                createdAt: "desc",
            }
        })
    } catch (_) {
        return undefined
    }
}

export async function FindLoanPaymentRepo(loanId:string) {
    try {
        return await db.loanPayment.findMany({
            where:{
                loanId: loanId,
            },
            select:{
                loanId: true,
                loanPaymentId: true,
                paidDate: true,
                paidStatus: true,
                createdAt: true,
                interestPercent: true,
                paidAmount: true,
                paymentAmount: true,
                principalAmount: true,
                scheduledPaymentDate: true,
            }
        })
    } catch (_) {
        return undefined
    }
}
