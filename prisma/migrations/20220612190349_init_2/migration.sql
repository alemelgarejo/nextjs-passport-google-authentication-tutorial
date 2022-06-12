/*
  Warnings:

  - You are about to drop the column `sub` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[google_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `google_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "sub",
ADD COLUMN     "google_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_google_id_key" ON "Users"("google_id");
