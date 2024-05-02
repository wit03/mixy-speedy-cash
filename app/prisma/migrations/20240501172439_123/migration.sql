/*
  Warnings:

  - You are about to drop the column `Term` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `Pin` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Career` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CitizenId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Salary` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "Pin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "Career" TEXT NOT NULL,
ADD COLUMN     "CitizenId" TEXT NOT NULL,
ADD COLUMN     "Salary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "Term";
