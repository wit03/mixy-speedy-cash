/*
  Warnings:

  - You are about to drop the column `interestAmount` on the `LoanPayment` table. All the data in the column will be lost.
  - Added the required column `interestPercent` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoanPayment" DROP COLUMN "interestAmount",
ADD COLUMN     "interestPercent" DOUBLE PRECISION NOT NULL;
