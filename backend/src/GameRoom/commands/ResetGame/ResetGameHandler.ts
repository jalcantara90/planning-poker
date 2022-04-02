import { ResetGameResponse } from './ResetGameResponse';
import { ResetGameCommand } from './ResetGameCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';


import { GameRoomRepository } from '../../services/GameRoom.service';

@CommandHandler(ResetGameCommand)
export class ResetGameHandler implements ICommandHandler<ResetGameCommand, ResetGameResponse> {

  constructor(
    private gameRoomRepository: GameRoomRepository
  ) {}

  execute({ gameId }: ResetGameCommand): Promise<ResetGameResponse> {
    this.gameRoomRepository.resetGame(gameId);
    const room = this.gameRoomRepository.getGameRoom(gameId);
    return Promise.resolve(new ResetGameResponse(room));
  }
}
