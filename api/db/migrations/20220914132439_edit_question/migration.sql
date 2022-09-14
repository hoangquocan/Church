/*
  Warnings:

  - A unique constraint covering the columns `[time]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `time` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Question_time_key` ON `Question`(`time`);
