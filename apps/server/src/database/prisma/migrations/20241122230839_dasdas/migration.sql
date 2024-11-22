/*
  Warnings:

  - You are about to alter the column `price` on the `consumptions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consumptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    CONSTRAINT "consumptions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "consumptions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_consumptions" ("amount", "client_id", "id", "item_id", "price") SELECT "amount", "client_id", "id", "item_id", "price" FROM "consumptions";
DROP TABLE "consumptions";
ALTER TABLE "new_consumptions" RENAME TO "consumptions";
CREATE INDEX "consumptions_item_id_idx" ON "consumptions"("item_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
