import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { Game } from '@infrastructure/entities';

import { GetGameByIdCommand } from './get-game-by-id.command';
import { GetGameByIdResponse } from './get-game-by-id.response';

@CommandHandler(GetGameByIdCommand)
export class GetGameByIdHandler implements ICommandHandler<GetGameByIdCommand, GetGameByIdResponse> {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>
  ) {}
  
  async execute(command: GetGameByIdCommand){
    const game = await this.gameRepository.findOne(command.id, {
      relations: ['votingSystem', 'votingSystem.options']
    });
    return new GetGameByIdResponse(
      game?.id,
      game?.name,
     {
       name: game?.votingSystem?.name,
       options: game?.votingSystem?.options?.map(({ value }) => value)
     }
    );
  }

}