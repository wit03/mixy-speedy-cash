/*
  Warnings:

  - You are about to drop the column `receiver` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `receiver` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `reciever` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reciever` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_receiver_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receiver_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "receiver",
ADD COLUMN     "reciever" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "receiver",
ADD COLUMN     "reciever" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_reciever_fkey" FOREIGN KEY ("reciever") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_reciever_fkey" FOREIGN KEY ("reciever") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
