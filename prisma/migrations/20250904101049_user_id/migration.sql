/*
  Warnings:

  - Added the required column `fragmentId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "fragmentId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
