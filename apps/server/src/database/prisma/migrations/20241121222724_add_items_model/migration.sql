/*
  Warnings:

  - You are about to drop the column `item_type` on the `consumptions` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "item_type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consumptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL,
    CONSTRAINT "consumptions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "consumptions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_consumptions" ("client_id", "id", "item_id", "quantity", "totalPrice") SELECT "client_id", "id", "item_id", "quantity", "totalPrice" FROM "consumptions";
DROP TABLE "consumptions";
ALTER TABLE "new_consumptions" RENAME TO "consumptions";
CREATE INDEX "consumptions_item_id_idx" ON "consumptions"("item_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
