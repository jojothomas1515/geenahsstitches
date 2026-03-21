/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "productImages" (
    "id" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "productId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "productImages_productId_idx" ON "productImages"("productId");

-- AddForeignKey
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
