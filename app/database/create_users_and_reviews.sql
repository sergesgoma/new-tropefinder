BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
    "user_id" INT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password" BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "reviews" (
    "review_id" INT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INT NOT NULL,
    "updated" BOOLEAN
);

COMMIT;