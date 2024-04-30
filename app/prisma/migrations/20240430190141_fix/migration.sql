/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "CreatedAt",
ALTER COLUMN "TransactionDate" SET DEFAULT CURRENT_TIMESTAMP;
