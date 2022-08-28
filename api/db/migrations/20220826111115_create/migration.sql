-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `urlAttendance` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` INTEGER UNSIGNED NOT NULL,
    `time` DATE NOT NULL,
    `totalActivity` INTEGER NOT NULL,
    `presentTrue` INTEGER NOT NULL,
    `presentFalse` INTEGER NOT NULL,
    `percentPresent` DECIMAL(65, 30) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
