/*
  Warnings:

  - You are about to drop the column `quantity` on the `consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `consumptions` table. All the data in the column will be lost.
  - Added the required column `amount` to the `consumptions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consumptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "consumptions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "consumptions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_consumptions" ("client_id", "id", "item_id") SELECT "client_id", "id", "item_id" FROM "consumptions";
DROP TABLE "consumptions";
ALTER TABLE "new_consumptions" RENAME TO "consumptions";
CREATE INDEX "consumptions_item_id_idx" ON "consumptions"("item_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
