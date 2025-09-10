/*
  Warnings:

  - Added the required column `url` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_ip` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "user_ip" TEXT NOT NULL,
ALTER COLUMN "utm_source" SET DEFAULT 'none',
ALTER COLUMN "referrer" SET DEFAULT 'none';
