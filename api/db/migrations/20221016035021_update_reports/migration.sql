-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_memberId_fkey`;

-- AlterTable
ALTER TABLE `Activity` MODIFY `groupId` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `Attendance` MODIFY `activityId` INTEGER UNSIGNED NULL,
    MODIFY `memberId` INTEGER UNSIGNED NULL;

-- CreateTable
CREATE TABLE `ReportQuarter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeQuarter` VARCHAR(20) NOT NULL,
    `groupId` INTEGER UNSIGNED NULL,
    `totalAttendance` INTEGER NOT NULL,
    `totalPresent` INTEGER NOT NULL,
    `percentPrecent` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportQuarter` ADD CONSTRAINT `ReportQuarter_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
