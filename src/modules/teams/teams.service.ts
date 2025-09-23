import { SeasonsRepository } from '@/modules/seasons/repositories';
import { StadiumsRepository } from '@/modules/stadiums/repositories';
import {
  LogosRepository,
  SnapshotsRepository,
} from '@/modules/teams/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  constructor(
    private readonly logosRepository: LogosRepository,
    private readonly seasonsRepository: SeasonsRepository,
    private readonly snapshotsRepository: SnapshotsRepository,
    private readonly stadiumsRepository: StadiumsRepository,
  ) {}
}
