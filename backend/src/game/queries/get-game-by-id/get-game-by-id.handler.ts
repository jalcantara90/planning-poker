import { Repository } from 'typeorm';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { GameEntity } from '@infrastructure/entities';
import { GetGameByIdResponse } from './get-game-by-id.response';
import { GetGameByIdCommand } from './get-game-by-id.command';

@CommandHandler(GetGameByIdCommand)
export class GetGameByIdHandler implements ICommandHandler<GetGameByIdCommand, GetGameByIdResponse> {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>
  ) {}
  
  async execute(command: GetGameByIdCommand): Promise<GetGameByIdResponse> {
    const game = await this.gameRepository.findOne(command.id);

    return new GetGameByIdResponse(
      game.id,
      game.name,
      game.votingSystem
    );
  }

}