/*
  Warnings:

  - Added the required column `nameEnglish` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Group` ADD COLUMN `nameEnglish` VARCHAR(191) NOT NULL;
