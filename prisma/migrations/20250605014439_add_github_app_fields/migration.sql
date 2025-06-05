/*
  Warnings:

  - You are about to drop the column `githubToken` on the `Tenants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tenants` DROP COLUMN `githubToken`,
    ADD COLUMN `githubAccessToken` VARCHAR(191) NULL,
    ADD COLUMN `githubAppInstallationId` VARCHAR(191) NULL,
    ADD COLUMN `githubAppInstalled` BOOLEAN NULL DEFAULT false;
