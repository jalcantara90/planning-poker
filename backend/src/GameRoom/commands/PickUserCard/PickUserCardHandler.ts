import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PickUserCardCommand } from './PickUserCardCommand';
import { PickUserCardResponse } from './PickUserCardResponse';
import { GameRoomRepository } from '../../services/GameRoom.service';

@CommandHandler(PickUserCardCommand)
export class PickUserCardHandler implements ICommandHandler<PickUserCardCommand, PickUserCardResponse> {

  constructor(
    private gameRoomRepository: GameRoomRepository
  ) {}

  execute({ gameId, user, selectedValue }: PickUserCardCommand): Promise<PickUserCardResponse> {
    this.gameRoomRepository.pickUserCard(gameId, user, selectedValue);
    const room = this.gameRoomRepository.getGameRoom(gameId);
    return Promise.resolve(new PickUserCardResponse(room));
  }
}
