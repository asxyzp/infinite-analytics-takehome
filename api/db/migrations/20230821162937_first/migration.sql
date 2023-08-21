/*
  Warnings:

  - Added the required column `description` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "sellerLogo" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "issueAt" SET DEFAULT CURRENT_TIMESTAMP;
