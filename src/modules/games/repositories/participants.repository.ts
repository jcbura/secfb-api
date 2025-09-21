import {
  BaseRepository,
  PrismaClientOrTransaction,
} from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GameParticipant, Prisma } from '@prisma/client';

@Injectable()
export class ParticipantsRepository extends BaseRepository<
  GameParticipant,
  Prisma.GameParticipantCreateInput,
  Prisma.GameParticipantUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'GameParticipant');
  }

  async findByGame(
    gameId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<GameParticipant[]> {
    const prismaClient = client || this.prismaService;

    try {
      const participants = await prismaClient.gameParticipant.findMany({
        where: { gameId },
      });

      return participants;
    } catch (error) {
      this.logger.error(
        `Database error fetching game participants by game ID ${gameId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByGameOrThrow(
    gameId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<GameParticipant[]> {
    const participants = await this.findByGame(gameId, client);
    if (participants.length === 0) {
      this.logger.warn(
        `Lookup failed: game participants with game ID ${gameId} not found`,
      );
      throw new NotFoundException(
        `Game participants with game ID ${gameId} not found`,
      );
    }
    return participants;
  }
}
