/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AccountId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `AccountStatus` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `AccountType` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `Balance` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `CustomerId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `Pin` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Career` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `CitizenId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `CustomerId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `CustomerType` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `DateOfBirth` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Salary` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `DateOfBirth` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `EmployeeId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Position` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Salary` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `Loan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AccountId` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `EndDate` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `InterestRate` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `LoanAmount` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `LoanId` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `LoanStatus` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `LoanType` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `ResponsibleEmployeeId` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `StartDate` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Loan` table. All the data in the column will be lost.
  - The primary key for the `LoanPayment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedAt` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `InterestAmount` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `LoanId` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `LoanPaymentId` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `PaidAmount` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `PaidDate` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `PaymentAmount` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `PrincipalAmount` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `ScheduledPaymentDate` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `LoanPayment` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedBy` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `NotiId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `PublishedAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `Read` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `Receiver` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `Text` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Detail` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Receiver` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Sender` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `TransactionDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `TransactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountStatus` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountType` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `career` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citizenId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerType` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kastName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestRate` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanAmount` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanStatus` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanType` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleEmployeeId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestAmount` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanId` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oaidDate` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orincipalAmount` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmount` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledPaymentDate` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_CustomerId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_AccountId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_ResponsibleEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "LoanPayment" DROP CONSTRAINT "LoanPayment_LoanId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_Receiver_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_Receiver_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_Sender_fkey";

-- DropIndex
DROP INDEX "Account_AccountId_key";

-- DropIndex
DROP INDEX "Customer_Email_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "AccountId",
DROP COLUMN "AccountStatus",
DROP COLUMN "AccountType",
DROP COLUMN "Balance",
DROP COLUMN "CreatedAt",
DROP COLUMN "CustomerId",
DROP COLUMN "Pin",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL,
ADD COLUMN     "accountType" "AccountType" NOT NULL,
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" UUID NOT NULL,
ADD COLUMN     "pin" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId");

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "Address",
DROP COLUMN "Career",
DROP COLUMN "CitizenId",
DROP COLUMN "CreatedAt",
DROP COLUMN "CustomerId",
DROP COLUMN "CustomerType",
DROP COLUMN "DateOfBirth",
DROP COLUMN "Email",
DROP COLUMN "FirstName",
DROP COLUMN "LastName",
DROP COLUMN "Password",
DROP COLUMN "PhoneNumber",
DROP COLUMN "Salary",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "career" TEXT NOT NULL,
ADD COLUMN     "citizenId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "customerType" "CustomerType" NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "salary" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId");

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "Address",
DROP COLUMN "CreatedAt",
DROP COLUMN "DateOfBirth",
DROP COLUMN "Email",
DROP COLUMN "EmployeeId",
DROP COLUMN "FirstName",
DROP COLUMN "LastName",
DROP COLUMN "Password",
DROP COLUMN "PhoneNumber",
DROP COLUMN "Position",
DROP COLUMN "Salary",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "employeeId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "kastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "position" "Position" NOT NULL,
ADD COLUMN     "salary" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId");

-- AlterTable
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_pkey",
DROP COLUMN "AccountId",
DROP COLUMN "EndDate",
DROP COLUMN "InterestRate",
DROP COLUMN "LoanAmount",
DROP COLUMN "LoanId",
DROP COLUMN "LoanStatus",
DROP COLUMN "LoanType",
DROP COLUMN "ResponsibleEmployeeId",
DROP COLUMN "StartDate",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "interestRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "loanAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "loanId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "loanStatus" "LoanStatus" NOT NULL,
ADD COLUMN     "loanType" "LoanType" NOT NULL,
ADD COLUMN     "responsibleEmployeeId" UUID NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Loan_pkey" PRIMARY KEY ("loanId");

-- AlterTable
ALTER TABLE "LoanPayment" DROP CONSTRAINT "LoanPayment_pkey",
DROP COLUMN "CreatedAt",
DROP COLUMN "InterestAmount",
DROP COLUMN "LoanId",
DROP COLUMN "LoanPaymentId",
DROP COLUMN "PaidAmount",
DROP COLUMN "PaidDate",
DROP COLUMN "PaymentAmount",
DROP COLUMN "PrincipalAmount",
DROP COLUMN "ScheduledPaymentDate",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "interestAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "loanId" UUID NOT NULL,
ADD COLUMN     "loanPaymentId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "oaidDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orincipalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "scheduledPaymentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "LoanPayment_pkey" PRIMARY KEY ("loanPaymentId");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "CreatedAt",
DROP COLUMN "CreatedBy",
DROP COLUMN "NotiId",
DROP COLUMN "PublishedAt",
DROP COLUMN "Read",
DROP COLUMN "Receiver",
DROP COLUMN "Text",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "notiId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "read" BOOLEAN NOT NULL,
ADD COLUMN     "receiver" UUID NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("notiId");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "Amount",
DROP COLUMN "Detail",
DROP COLUMN "Receiver",
DROP COLUMN "Sender",
DROP COLUMN "TransactionDate",
DROP COLUMN "TransactionId",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "receiver" TEXT NOT NULL,
ADD COLUMN     "sender" TEXT NOT NULL,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionId" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountId_key" ON "Account"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_responsibleEmployeeId_fkey" FOREIGN KEY ("responsibleEmployeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPayment" ADD CONSTRAINT "LoanPayment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("loanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sender_fkey" FOREIGN KEY ("sender") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
