/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");
