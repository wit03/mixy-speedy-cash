-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_reciever_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "reciever" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_reciever_fkey" FOREIGN KEY ("reciever") REFERENCES "Account"("accountId") ON DELETE SET NULL ON UPDATE CASCADE;
