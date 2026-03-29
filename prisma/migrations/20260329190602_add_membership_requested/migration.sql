-- AlterTable
ALTER TABLE "users" ADD COLUMN     "memberRequested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sandikRequested" BOOLEAN NOT NULL DEFAULT false;
