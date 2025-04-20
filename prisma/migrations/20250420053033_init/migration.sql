-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_capacityId_fkey";

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "Capacity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
