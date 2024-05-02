-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "taskName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
