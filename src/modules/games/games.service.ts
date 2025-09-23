import {
  GamesRepository,
  ParticipantsRepository,
} from '@/modules/games/repositories';
import { SeasonsRepository } from '@/modules/seasons/repositories';
import { StadiumsRepository } from '@/modules/stadiums/repositories';
import { TeamsRepository } from '@/modules/teams/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly participantsRepository: ParticipantsRepository,
    private readonly seasonsRepository: SeasonsRepository,
    private readonly stadiumsRepository: StadiumsRepository,
    private readonly teamsRepository: TeamsRepository,
  ) {}
}
