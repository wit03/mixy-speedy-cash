/*
  Warnings:

  - You are about to drop the column `kastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `oaidDate` on the `LoanPayment` table. All the data in the column will be lost.
  - You are about to drop the column `orincipalAmount` on the `LoanPayment` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidDate` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principalAmount` to the `LoanPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "kastName",
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LoanPayment" DROP COLUMN "oaidDate",
DROP COLUMN "orincipalAmount",
ADD COLUMN     "paidDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "principalAmount" DOUBLE PRECISION NOT NULL;
