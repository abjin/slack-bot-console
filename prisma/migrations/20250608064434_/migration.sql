/*
  Warnings:

  - You are about to drop the column `githubPineconeIndexName` on the `Tenants` table. All the data in the column will be lost.
  - You are about to drop the column `notionPineconeIndexName` on the `Tenants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tenants` DROP COLUMN `githubPineconeIndexName`,
    DROP COLUMN `notionPineconeIndexName`;
