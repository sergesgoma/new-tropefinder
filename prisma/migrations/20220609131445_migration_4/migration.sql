/*
  Warnings:

  - You are about to drop the column `user_id` on the `Reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_user_id_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "user_id",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_username_key" ON "Reviews"("username");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
