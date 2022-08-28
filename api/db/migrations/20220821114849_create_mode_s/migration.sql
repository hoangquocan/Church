/*
  Warnings:

  - Added the required column `urlAvatar` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` ADD COLUMN `urlAvatar` VARCHAR(191) NOT NULL;
