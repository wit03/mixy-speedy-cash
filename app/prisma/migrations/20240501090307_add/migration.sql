/*
  Warnings:

  - Changed the type of `AccountStatus` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('InUse', 'Closed');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "AccountStatus",
ADD COLUMN     "AccountStatus" "AccountStatus" NOT NULL;
