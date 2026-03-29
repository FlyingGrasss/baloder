-- AlterTable
ALTER TABLE "deposit_requests" ADD COLUMN     "contentType" TEXT,
ADD COLUMN     "pathname" TEXT,
ADD COLUMN     "size" INTEGER;

-- CreateTable
CREATE TABLE "id_card_orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studentNo" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "deliveryDetails" TEXT NOT NULL,
    "receiptUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "id_card_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "id_card_orders" ADD CONSTRAINT "id_card_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
