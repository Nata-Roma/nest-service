/*
  Warnings:

  - You are about to drop the column `albumId` on the `Artist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artistId]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "artistId" TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "albumId";

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_key" ON "Album"("artistId");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
