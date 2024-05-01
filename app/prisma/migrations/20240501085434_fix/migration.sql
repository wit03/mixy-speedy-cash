/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[AccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_Receiver_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_Sender_fkey";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ALTER COLUMN "AccountId" DROP DEFAULT,
ALTER COLUMN "AccountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountId");

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "Sender" SET DATA TYPE TEXT,
ALTER COLUMN "Receiver" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_AccountId_key" ON "Account"("AccountId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_Sender_fkey" FOREIGN KEY ("Sender") REFERENCES "Account"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_Receiver_fkey" FOREIGN KEY ("Receiver") REFERENCES "Account"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;
