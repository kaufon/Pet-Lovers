/*
  Warnings:

  - You are about to alter the column `emission_date` on the `cpfs` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cpfs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "emission_date" DATETIME NOT NULL,
    CONSTRAINT "cpfs_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cpfs" ("client_id", "emission_date", "id", "value") SELECT "client_id", "emission_date", "id", "value" FROM "cpfs";
DROP TABLE "cpfs";
ALTER TABLE "new_cpfs" RENAME TO "cpfs";
CREATE UNIQUE INDEX "cpfs_client_id_key" ON "cpfs"("client_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
