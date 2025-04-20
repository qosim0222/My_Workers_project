/*
  Warnings:

  - You are about to drop the column `brand` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `description_en` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `description_ru` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `description_uz` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `name_en` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `name_ru` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `name_uz` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Tool` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Tool` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[code]` on the table `Tool` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descriptionUz` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameUz` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "brand",
DROP COLUMN "capacity",
DROP COLUMN "description_en",
DROP COLUMN "description_ru",
DROP COLUMN "description_uz",
DROP COLUMN "image",
DROP COLUMN "isActive",
DROP COLUMN "name_en",
DROP COLUMN "name_ru",
DROP COLUMN "name_uz",
DROP COLUMN "size",
ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionRu" TEXT,
ADD COLUMN     "descriptionUz" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nameRu" TEXT,
ADD COLUMN     "nameUz" TEXT NOT NULL,
ADD COLUMN     "powerId" TEXT,
ADD COLUMN     "sizeId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_code_key" ON "Tool"("code");

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;
