/*
  Warnings:

  - The values [InUse,Closed] on the enum `AccountStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Deposit,Saving] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Personal,Company] on the enum `CustomerType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountStatus_new" AS ENUM ('inUse', 'closed');
ALTER TABLE "Account" ALTER COLUMN "accountStatus" TYPE "AccountStatus_new" USING ("accountStatus"::text::"AccountStatus_new");
ALTER TYPE "AccountStatus" RENAME TO "AccountStatus_old";
ALTER TYPE "AccountStatus_new" RENAME TO "AccountStatus";
DROP TYPE "AccountStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('deposit', 'saving');
ALTER TABLE "Account" ALTER COLUMN "accountType" TYPE "AccountType_new" USING ("accountType"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CustomerType_new" AS ENUM ('personal', 'company');
ALTER TABLE "Customer" ALTER COLUMN "customerType" TYPE "CustomerType_new" USING ("customerType"::text::"CustomerType_new");
ALTER TYPE "CustomerType" RENAME TO "CustomerType_old";
ALTER TYPE "CustomerType_new" RENAME TO "CustomerType";
DROP TYPE "CustomerType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "LoanStatus" ADD VALUE 'waiting';

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_responsibleEmployeeId_fkey";

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "responsibleEmployeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_responsibleEmployeeId_fkey" FOREIGN KEY ("responsibleEmployeeId") REFERENCES "Employee"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;
