-- AlterTable
ALTER TABLE "Guestbook" ADD COLUMN     "claimed" TIMESTAMP(3);
ALTER TABLE "Guestbook" ADD COLUMN     "generated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
