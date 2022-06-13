/*
  Warnings:

  - Made the column `updated` on table `Reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "updated" SET NOT NULL,
ALTER COLUMN "updated" SET DEFAULT false;
