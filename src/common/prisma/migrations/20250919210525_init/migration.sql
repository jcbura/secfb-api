-- CreateEnum
CREATE TYPE "public"."Conference" AS ENUM ('AMERICAN', 'ACC', 'BIG_12', 'BIG_TEN', 'CONFERENCE_USA', 'FBS_INDEPENDENT', 'MID_AMERICAN', 'MOUNTAIN_WEST', 'PAC_12', 'SEC', 'SUN_BELT');

-- CreateEnum
CREATE TYPE "public"."GameType" AS ENUM ('REGULAR_SEASON', 'CONFERENCE_CHAMPIONSHIP', 'BOWL', 'PLAYOFF_FIRST_ROUND', 'QUARTERFINAL', 'SEMIFINAL', 'NATIONAL_CHAMPIONSHIP');

-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'FINAL');

-- CreateTable
CREATE TABLE "public"."teams" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "short_display_name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "mascot" TEXT NOT NULL,
    "conference" "public"."Conference" NOT NULL DEFAULT 'SEC',
    "stadium_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."logos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "dark_url" TEXT NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 500,
    "height" INTEGER NOT NULL DEFAULT 500,
    "alt" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team_season_snapshots" (
    "id" SERIAL NOT NULL,
    "wins" INTEGER,
    "losses" INTEGER,
    "conference_wins" INTEGER,
    "conference_losses" INTEGER,
    "home_wins" INTEGER,
    "home_losses" INTEGER,
    "away_wins" INTEGER,
    "away_losses" INTEGER,
    "neutral_wins" INTEGER,
    "neutral_losses" INTEGER,
    "streak" INTEGER,
    "is_win_streak" BOOLEAN,
    "conference_rank" INTEGER,
    "total_defense" INTEGER,
    "total_offense" INTEGER,
    "ap_poll" INTEGER,
    "coaches_poll" INTEGER,
    "cfp_rank" INTEGER,
    "football_power_index" INTEGER,
    "strength_of_record" INTEGER,
    "strength_of_schedule" INTEGER,
    "remaining_strength_of_schedule" INTEGER,
    "team_id" INTEGER NOT NULL,
    "season_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_season_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stadiums" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "field" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "capacity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stadiums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."seasons" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_current_season" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."games" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "is_time_tbd" BOOLEAN NOT NULL DEFAULT false,
    "week_number" INTEGER,
    "attendance" INTEGER,
    "game_type" "public"."GameType" NOT NULL,
    "is_conference_game" BOOLEAN NOT NULL,
    "is_neutral_site" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."GameStatus" NOT NULL DEFAULT 'SCHEDULED',
    "ended_in_overtime" BOOLEAN NOT NULL,
    "overtimes" INTEGER,
    "season_id" INTEGER NOT NULL,
    "stadium_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."game_participants" (
    "id" SERIAL NOT NULL,
    "is_home_team" BOOLEAN NOT NULL,
    "score" INTEGER,
    "is_winner" BOOLEAN,
    "game_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_slug_key" ON "public"."teams"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "teams_display_name_key" ON "public"."teams"("display_name");

-- CreateIndex
CREATE UNIQUE INDEX "teams_short_display_name_key" ON "public"."teams"("short_display_name");

-- CreateIndex
CREATE UNIQUE INDEX "teams_abbreviation_key" ON "public"."teams"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "logos_url_key" ON "public"."logos"("url");

-- CreateIndex
CREATE UNIQUE INDEX "logos_dark_url_key" ON "public"."logos"("dark_url");

-- CreateIndex
CREATE UNIQUE INDEX "logos_team_id_key" ON "public"."logos"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_season_snapshots_team_id_season_id_key" ON "public"."team_season_snapshots"("team_id", "season_id");

-- CreateIndex
CREATE UNIQUE INDEX "stadiums_slug_key" ON "public"."stadiums"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "stadiums_name_city_state_key" ON "public"."stadiums"("name", "city", "state");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_slug_key" ON "public"."seasons"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_name_key" ON "public"."seasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_start_date_end_date_key" ON "public"."seasons"("start_date", "end_date");

-- CreateIndex
CREATE UNIQUE INDEX "games_slug_key" ON "public"."games"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "games_season_id_date_stadium_id_key" ON "public"."games"("season_id", "date", "stadium_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_participants_game_id_team_id_key" ON "public"."game_participants"("game_id", "team_id");

-- AddForeignKey
ALTER TABLE "public"."teams" ADD CONSTRAINT "teams_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "public"."stadiums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."logos" ADD CONSTRAINT "logos_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_season_snapshots" ADD CONSTRAINT "team_season_snapshots_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_season_snapshots" ADD CONSTRAINT "team_season_snapshots_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."games" ADD CONSTRAINT "games_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."games" ADD CONSTRAINT "games_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "public"."stadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_participants" ADD CONSTRAINT "game_participants_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_participants" ADD CONSTRAINT "game_participants_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
