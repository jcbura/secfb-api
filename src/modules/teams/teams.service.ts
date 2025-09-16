import { TeamsRepository } from '@/modules/teams/teams.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}
}
