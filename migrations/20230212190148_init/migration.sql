-- CreateTable
CREATE TABLE "Guestbook" (
    "id" UUID NOT NULL,
    "code" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "Guestbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" UUID NOT NULL,
    "name" STRING NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "guestbookId" UUID NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guestbook_code_key" ON "Guestbook"("code");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_guestbookId_fkey" FOREIGN KEY ("guestbookId") REFERENCES "Guestbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
