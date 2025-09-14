/*
  Warnings:

  - Added the required column `sessionId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "utm_source" DROP DEFAULT,
ALTER COLUMN "referrer" DROP DEFAULT;
