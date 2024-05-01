/*
  Warnings:

  - You are about to drop the column `CustomerId` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `AccountId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_CustomerId_fkey";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "CustomerId",
ADD COLUMN     "AccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Account"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;
