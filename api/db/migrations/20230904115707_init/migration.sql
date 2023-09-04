-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('OUTSTANDING', 'PAID', 'LATE');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "issueAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "sellerLogo" TEXT,
    "sellerName" TEXT NOT NULL,
    "sellerAddress" TEXT,
    "sellerPhone" TEXT,
    "sellerEmail" TEXT,
    "buyerName" TEXT NOT NULL,
    "buyerAddress" TEXT,
    "buyerPhone" TEXT,
    "buyerEmail" TEXT,
    "lineItems" JSONB NOT NULL,
    "paymentTerms" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
