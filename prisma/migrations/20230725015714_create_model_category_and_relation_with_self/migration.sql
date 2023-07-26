-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photoUrl" TEXT,
    "categoryParentId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryParentId_key" ON "Category"("categoryParentId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryParentId_fkey" FOREIGN KEY ("categoryParentId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
