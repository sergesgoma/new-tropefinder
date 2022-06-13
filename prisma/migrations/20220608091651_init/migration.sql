-- CreateTable
CREATE TABLE "books" (
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

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_book_id_key" ON "books"("book_id");
