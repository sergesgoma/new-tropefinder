/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_username_fkey";

-- DropIndex
DROP INDEX "Reviews_username_key";

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_user_id_key" ON "Reviews"("user_id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
