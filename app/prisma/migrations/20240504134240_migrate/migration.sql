/*
  Warnings:

  - Added the required column `paidStatus` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaidStatus" AS ENUM ('paid', 'inDept');

-- AlterTable
ALTER TABLE "LoanPayment" ADD COLUMN     "paidStatus" "PaidStatus" NOT NULL;
