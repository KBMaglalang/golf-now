/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `Order` table. All the data in the column will be lost.
  - Added the required column `productName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSKU` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSubTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "productSKU" TEXT NOT NULL,
ADD COLUMN     "productSubTotal" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
