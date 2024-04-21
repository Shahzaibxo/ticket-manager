/*
  Warnings:

  - The values [IN_PROGRESS] on the enum `Issue_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `image` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('OPEN', 'PENDING', 'CLOSED') NOT NULL DEFAULT 'OPEN';
