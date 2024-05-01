/*
  Warnings:

  - Added the required column `Detail` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "Detail" TEXT NOT NULL;
