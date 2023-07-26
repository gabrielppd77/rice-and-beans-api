/*
  Warnings:

  - You are about to alter the column `name` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
  - You are about to alter the column `description` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_categoryParentId_fkey";

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "name" SET DATA TYPE VARCHAR(55),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(55),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(55);

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "photoUrl" VARCHAR(55),
    "categoryParentId" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "photoUrl" VARCHAR(55),
    "description" VARCHAR(255),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_categoryParentId_fkey" FOREIGN KEY ("categoryParentId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
