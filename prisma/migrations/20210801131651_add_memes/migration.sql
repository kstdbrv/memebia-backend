-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('TELEGRAM', 'UPLOADED');

-- CreateTable
CREATE TABLE "Meme" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" TEXT NOT NULL,
    "text" TEXT,
    "source" "SourceType" NOT NULL,
    "sourceId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatedMemes" (
    "id" TEXT NOT NULL,
    "liked" TEXT[],
    "disliked" TEXT[],
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meme.imageId_unique" ON "Meme"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "RatedMemes.userId_unique" ON "RatedMemes"("userId");

-- AddForeignKey
ALTER TABLE "RatedMemes" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
