import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { GameEntity, VotingSystemOptionEntity, VotingSystemEntity } from '@infrastructure/entities';

import { GetGameByIdCommand } from './get-game-by-id.command';
import { GetGameByIdResponse } from './get-game-by-id.response';

@CommandHandler(GetGameByIdCommand)
export class GetGameByIdHandler implements ICommandHandler<GetGameByIdCommand, GetGameByIdResponse> {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>
  ) {}
  
  async execute(command: GetGameByIdCommand){
    const game = await this.gameRepository.createQueryBuilder('game')
      .innerJoinAndMapOne('game.votingSystem', VotingSystemEntity, 'votingSystem', 'game.votingSystem = votingSystem.id')
      .leftJoinAndMapMany(`votingSystem.options`, VotingSystemOptionEntity, 'votingSystemOptions', 'votingSystem.id = votingSystemOptions.votingSystemId')
      .getOne();
    
    return new GetGameByIdResponse(
      game.id,
      game.name,
     {
       name: game.votingSystem.name,
       options: game.votingSystem.options?.map(({ value }) => value)
     }
    );
  }

}