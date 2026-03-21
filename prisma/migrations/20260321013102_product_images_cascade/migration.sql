-- DropForeignKey
ALTER TABLE "productImages" DROP CONSTRAINT "productImages_productId_fkey";

-- AddForeignKey
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
