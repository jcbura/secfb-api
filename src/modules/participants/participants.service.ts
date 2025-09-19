import { ParticipantsRepository } from '@/modules/participants/participants.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantsRepository: ParticipantsRepository,
  ) {}
}
