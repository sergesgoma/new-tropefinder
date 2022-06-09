/*
  Warnings:

  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "img" TEXT,
    "gdRating" DECIMAL(3,2),
    "series" TEXT,
    "seriesName" TEXT,
    "numSeries" TEXT,
    "numGdRating" INTEGER,
    "numGdReview" TEXT,
    "format" TEXT,
    "firstPublished" TEXT,
    "yearOfPublication" TEXT,
    "language" TEXT,
    "awards" TEXT[],
    "tag" TEXT[],
    "genres" TEXT[],
    "summary" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "review_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "review" TEXT,
    "book_id" INTEGER NOT NULL,
    "stars" INTEGER,
    "updated" BOOLEAN,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_book_id_key" ON "Book"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_book_id_key" ON "Reviews"("book_id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
