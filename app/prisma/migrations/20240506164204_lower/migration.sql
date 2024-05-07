/*
  Warnings:

  - Made the column `reciever` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_reciever_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "reciever" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_reciever_fkey" FOREIGN KEY ("reciever") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;
