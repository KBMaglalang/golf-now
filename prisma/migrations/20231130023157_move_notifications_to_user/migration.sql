/*
  Warnings:

  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "newsLetterNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "smsNotification" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Notifications";
