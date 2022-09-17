/*
  Warnings:

  - You are about to drop the column `productSKU` on the `Order` table. All the data in the column will be lost.
  - Added the required column `stripeOrderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `quantity` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productSKU",
ADD COLUMN     "stripeOrderId" TEXT NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL;
