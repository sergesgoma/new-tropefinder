BEGIN;

CREATE TABLE IF NOT EXISTS "User" (
    "user_id" INT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "Reviews" (
    "review_id" INT NOT NULL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "book_id" INT NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INT NOT NULL,
    "updated" BOOLEAN NOT NULL
);

COMMIT;