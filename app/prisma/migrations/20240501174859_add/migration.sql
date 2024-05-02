/*
  Warnings:

  - Changed the type of `Salary` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `Password` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "Salary",
ADD COLUMN     "Salary" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "Password" TEXT NOT NULL;
