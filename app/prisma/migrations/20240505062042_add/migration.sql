-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('transfer', 'loan');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionType" "TransactionType" NOT NULL DEFAULT 'transfer';
