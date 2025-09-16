/*
  Warnings:

  - Made the column `ended_in_overtime` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."games" ALTER COLUMN "ended_in_overtime" SET NOT NULL;
