/*
  Warnings:

  - The primary key for the `Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `groupId` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `activityId` on the `Attendance` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `memberId` on the `Attendance` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `groupId` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `groupId` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `groupId` on the `ReportQuarter` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Member` DROP FOREIGN KEY `Member_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `ReportQuarter` DROP FOREIGN KEY `ReportQuarter_groupId_fkey`;

-- AlterTable
ALTER TABLE `Activity` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `groupId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Attendance` MODIFY `activityId` INTEGER NULL,
    MODIFY `memberId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Group` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Member` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `groupId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Report` MODIFY `groupId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ReportQuarter` MODIFY `groupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportQuarter` ADD CONSTRAINT `ReportQuarter_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
