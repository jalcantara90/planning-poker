import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import { GameEntity, VotingSystemEntity } from '@infrastructure/entities';

import { CreateGameCommand } from './create-game.command';
import { CreateGameResponse } from './create-game.response';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand, CreateGameResponse> {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(VotingSystemEntity)
    private votingSystemRepository: Repository<VotingSystemEntity>,
  ) {}

  async execute(command: CreateGameCommand) {
    const votingSystem = await this.votingSystemRepository.findOne(command.votingSystemId);

    const game = await this.gameRepository.save({
      ...command,
      votingSystem
    });
    return new CreateGameResponse(game.id);
  }
}
