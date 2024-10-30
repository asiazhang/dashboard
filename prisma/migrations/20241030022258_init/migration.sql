/*
  Warnings:

  - Added the required column `tool` to the `TestImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TestImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TestImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TestImage" ("count", "createdAt", "id", "name", "projectId", "toolName", "updatedAt", "userId") SELECT "count", "createdAt", "id", "name", "projectId", "toolName", "updatedAt", "userId" FROM "TestImage";
DROP TABLE "TestImage";
ALTER TABLE "new_TestImage" RENAME TO "TestImage";
CREATE UNIQUE INDEX "TestImage_name_toolName_key" ON "TestImage"("name", "toolName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
