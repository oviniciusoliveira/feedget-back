-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);
