-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "buy" TEXT NOT NULL,
    "sell" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "base" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
