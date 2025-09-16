import { GamesRepository } from '@/modules/games/games.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}
}
