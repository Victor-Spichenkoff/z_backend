/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Tweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSlug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answerOf" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Tweet_userSlug_fkey" FOREIGN KEY ("userSlug") REFERENCES "User" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TweetLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSlug" TEXT NOT NULL,
    "tweetId" INTEGER NOT NULL,
    CONSTRAINT "TweetLike_userSlug_fkey" FOREIGN KEY ("userSlug") REFERENCES "User" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TweetLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Folow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user1Slug" TEXT NOT NULL,
    "user2Slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Trend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hashtag" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 1,
    "upadtedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default.png',
    "cover" TEXT NOT NULL DEFAULT 'default.png',
    "bio" TEXT,
    "link" TEXT
);
INSERT INTO "new_User" ("email", "name") SELECT "email", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
