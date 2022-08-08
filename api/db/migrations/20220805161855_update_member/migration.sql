-- DropForeignKey
ALTER TABLE `Member` DROP FOREIGN KEY `Member_groupId_fkey`;

-- AlterTable
ALTER TABLE `Member` MODIFY `groupId` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
