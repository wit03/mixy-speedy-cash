import { $Enums, LoanPayment } from "@prisma/client";

export interface InsertLoanType {
    loanType: $Enums.LoanType;
    loanAmount: number;
    interestRate: number;
    installmentLength: number
}

export type InsertManyLoanPaymentType = Omit<LoanPayment, "loanPaymentId" | "createdAt" | "updatedAt" | "paidDate">;
