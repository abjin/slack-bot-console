/*
  Warnings:

  - You are about to drop the column `slackAccessToken` on the `Tenants` table. All the data in the column will be lost.
  - You are about to drop the column `slackTeamId` on the `Tenants` table. All the data in the column will be lost.
  - You are about to drop the column `slackUserId` on the `Tenants` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tenants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "notionApiKey" TEXT,
    "notionDatabaseId" TEXT,
    "githubToken" TEXT,
    "tenantId" TEXT,
    "slackBotToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tenants" ("createdAt", "githubToken", "id", "notionApiKey", "notionDatabaseId", "updatedAt", "userId") SELECT "createdAt", "githubToken", "id", "notionApiKey", "notionDatabaseId", "updatedAt", "userId" FROM "Tenants";
DROP TABLE "Tenants";
ALTER TABLE "new_Tenants" RENAME TO "Tenants";
CREATE UNIQUE INDEX "Tenants_userId_key" ON "Tenants"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
