-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('Personal', 'Company');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('employee', 'manager', 'owner');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Deposit', 'Saving');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('normal', 'special');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('onProcess', 'inDebt');

-- CreateTable
CREATE TABLE "Customer" (
    "CustomerId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "CustomerType" "CustomerType" NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerId")
);

-- CreateTable
CREATE TABLE "Employee" (
    "EmployeeId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "Position" "Position" NOT NULL,
    "LastName" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Salary" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("EmployeeId")
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "CustomerId" UUID NOT NULL,
    "AccountNumber" TEXT NOT NULL,
    "Balance" DOUBLE PRECISION NOT NULL,
    "AccountType" "AccountType" NOT NULL,
    "AccountStatus" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountId")
);

-- CreateTable
CREATE TABLE "Loan" (
    "LoanId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ResponsibleEmployeeId" UUID NOT NULL,
    "CustomerId" UUID NOT NULL,
    "LoanType" "LoanType" NOT NULL,
    "LoanAmount" DOUBLE PRECISION NOT NULL,
    "InterestRate" DOUBLE PRECISION NOT NULL,
    "Term" INTEGER NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "LoanStatus" "LoanStatus" NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("LoanId")
);

-- CreateTable
CREATE TABLE "LoanPayment" (
    "LoanId" UUID NOT NULL,
    "LoanPaymentId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ScheduledPaymentDate" TIMESTAMP(3) NOT NULL,
    "PaymentAmount" DOUBLE PRECISION NOT NULL,
    "PrincipalAmount" DOUBLE PRECISION NOT NULL,
    "InterestAmount" DOUBLE PRECISION NOT NULL,
    "PaidAmount" DOUBLE PRECISION NOT NULL,
    "PaidDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanPayment_pkey" PRIMARY KEY ("LoanPaymentId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "TransactionId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "TransactionType" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "TransactionDate" TIMESTAMP(3) NOT NULL,
    "Sender" UUID NOT NULL,
    "Receiver" UUID NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("TransactionId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "NotiId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "Receiver" UUID NOT NULL,
    "CreatedBy" UUID NOT NULL,
    "Text" TEXT NOT NULL,
    "Read" BOOLEAN NOT NULL,
    "PublishedAt" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotiId")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_ResponsibleEmployeeId_fkey" FOREIGN KEY ("ResponsibleEmployeeId") REFERENCES "Employee"("EmployeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPayment" ADD CONSTRAINT "LoanPayment_LoanId_fkey" FOREIGN KEY ("LoanId") REFERENCES "Loan"("LoanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_Sender_fkey" FOREIGN KEY ("Sender") REFERENCES "Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_Receiver_fkey" FOREIGN KEY ("Receiver") REFERENCES "Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_Receiver_fkey" FOREIGN KEY ("Receiver") REFERENCES "Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "Employee"("EmployeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
