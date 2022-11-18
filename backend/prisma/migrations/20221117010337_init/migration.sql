/*
  Warnings:

  - You are about to alter the column `value` on the `Transactions` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "value" SET DATA TYPE DECIMAL(9,2);
