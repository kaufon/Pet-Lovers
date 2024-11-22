-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "item_type" TEXT NOT NULL,
    "ordersCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_item" ("id", "item_type", "name", "price") SELECT "id", "item_type", "name", "price" FROM "item";
DROP TABLE "item";
ALTER TABLE "new_item" RENAME TO "item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
