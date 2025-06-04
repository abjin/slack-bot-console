/*
  Warnings:

  - A unique constraint covering the columns `[tenantId]` on the table `Tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tenants_tenantId_key` ON `Tenants`(`tenantId`);
