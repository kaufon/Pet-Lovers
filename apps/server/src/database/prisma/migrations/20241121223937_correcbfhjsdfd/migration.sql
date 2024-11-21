/*
  Warnings:

  - You are about to alter the column `emission_date` on the `rgs` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rgs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "emission_date" DATETIME NOT NULL,
    CONSTRAINT "rgs_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_rgs" ("client_id", "emission_date", "id", "value") SELECT "client_id", "emission_date", "id", "value" FROM "rgs";
DROP TABLE "rgs";
ALTER TABLE "new_rgs" RENAME TO "rgs";
CREATE UNIQUE INDEX "rgs_client_id_key" ON "rgs"("client_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
