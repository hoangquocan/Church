-- DropForeignKey
ALTER TABLE `Group` DROP FOREIGN KEY `Group_userId_fkey`;

-- AlterTable
ALTER TABLE `Group` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
