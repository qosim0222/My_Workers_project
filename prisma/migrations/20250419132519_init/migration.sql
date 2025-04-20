/*
  Warnings:

  - You are about to drop the column `content` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `name_en` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `name_ru` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `name_uz` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `minWorkingHours` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `passportImage` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `price_daily` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `price_hourly` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `tools` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `commentToDelivery` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `location_lat` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `location_long` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `masters` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productInfo` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tools` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - The `paymentType` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ownerId` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeUnit` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workingTime` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameUz` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthYear` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportImg` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryComment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'CLICK', 'PAYME');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'FINISHED');

-- CreateEnum
CREATE TYPE "TimeUnit" AS ENUM ('HOURLY', 'DAILY');

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "content",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "levelId" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "professionId" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "timeUnit" "TimeUnit" NOT NULL,
ADD COLUMN     "toolId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workingTime" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "name_en",
DROP COLUMN "name_ru",
DROP COLUMN "name_uz",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nameRu" TEXT,
ADD COLUMN     "nameUz" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Master" DROP COLUMN "experience",
DROP COLUMN "fullName",
DROP COLUMN "image",
DROP COLUMN "level",
DROP COLUMN "minWorkingHours",
DROP COLUMN "passportImage",
DROP COLUMN "phone",
DROP COLUMN "price_daily",
DROP COLUMN "price_hourly",
DROP COLUMN "products",
DROP COLUMN "star",
DROP COLUMN "tools",
DROP COLUMN "year",
ADD COLUMN     "birthYear" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "passportImg" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "commentToDelivery",
DROP COLUMN "location_lat",
DROP COLUMN "location_long",
DROP COLUMN "masters",
DROP COLUMN "productInfo",
DROP COLUMN "tools",
DROP COLUMN "total",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveryComment" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "paymentType",
ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'CASH',
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Condition";

-- DropEnum
DROP TYPE "StatusProduct";

-- DropEnum
DROP TYPE "TradeType";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "MasterProfession" (
    "id" TEXT NOT NULL,
    "professionId" TEXT,
    "minWorkingHours" INTEGER,
    "levelId" TEXT,
    "priceHourly" DECIMAL(65,30) NOT NULL,
    "priceDaily" DECIMAL(65,30) NOT NULL,
    "experience" DOUBLE PRECISION NOT NULL,
    "masterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterProfession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profession" (
    "id" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameRu" TEXT,
    "nameEn" TEXT,
    "img" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionLevel" (
    "id" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "minWorkingHours" INTEGER NOT NULL,
    "priceHourly" DECIMAL(65,30) NOT NULL,
    "priceDaily" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionTool" (
    "id" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "professionId" TEXT,
    "toolId" TEXT,
    "levelId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "timeUnit" "TimeUnit" NOT NULL,
    "workingTime" DOUBLE PRECISION NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderMaster" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "masterid" TEXT NOT NULL,

    CONSTRAINT "OrderMaster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MasterProfession" ADD CONSTRAINT "MasterProfession_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterProfession" ADD CONSTRAINT "MasterProfession_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterProfession" ADD CONSTRAINT "MasterProfession_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionLevel" ADD CONSTRAINT "ProfessionLevel_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionLevel" ADD CONSTRAINT "ProfessionLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionTool" ADD CONSTRAINT "ProfessionTool_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionTool" ADD CONSTRAINT "ProfessionTool_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMaster" ADD CONSTRAINT "OrderMaster_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMaster" ADD CONSTRAINT "OrderMaster_masterid_fkey" FOREIGN KEY ("masterid") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterRatings" ADD CONSTRAINT "MasterRatings_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
