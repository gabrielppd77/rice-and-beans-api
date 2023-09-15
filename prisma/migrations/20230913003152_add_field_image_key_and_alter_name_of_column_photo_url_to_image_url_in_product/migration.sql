/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "photoUrl",
ADD COLUMN     "imageKey" VARCHAR(555),
ADD COLUMN     "imageUrl" VARCHAR(555);
