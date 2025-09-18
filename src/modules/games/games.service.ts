import { GamesRepository } from '@/modules/games/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}
}
