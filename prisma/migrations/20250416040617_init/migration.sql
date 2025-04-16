/*
  Warnings:

  - You are about to drop the column `name` on the `Region` table. All the data in the column will be lost.
  - Added the required column `name_en` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_ru` to the `Region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_uz` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Region" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ru" TEXT NOT NULL,
ADD COLUMN     "name_uz" TEXT NOT NULL;
