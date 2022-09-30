-- AlterTable
ALTER TABLE `Question` MODIFY `questionOne` TEXT NOT NULL,
    MODIFY `questionTwo` TEXT NOT NULL,
    MODIFY `questionThree` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Report` MODIFY `answerOne` TEXT NOT NULL,
    MODIFY `answerTwo` TEXT NOT NULL,
    MODIFY `answerThree` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Audit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `log` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Audit` ADD CONSTRAINT `Audit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
