-- AlterTable
ALTER TABLE "public"."games" ALTER COLUMN "status" SET DEFAULT 'SCHEDULED',
ALTER COLUMN "ended_in_overtime" SET DEFAULT false;
