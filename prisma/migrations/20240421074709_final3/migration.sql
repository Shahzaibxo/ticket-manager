/*
  Warnings:

  - You are about to drop the column `image` on the `issue` table. All the data in the column will be lost.
  - Added the required column `Image_URL` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `image`,
    ADD COLUMN `Image_URL` VARCHAR(191) NOT NULL;
