import { TeamsRepository } from '@/modules/teams/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}
}
