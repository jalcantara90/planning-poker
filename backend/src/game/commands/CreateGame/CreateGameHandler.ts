import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import { Game, VotingSystem } from '@Data/Entities';

import { CreateGameCommand } from './CreateGameCommand';
import { CreateGameResponse } from './CreateGameResponse';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand, CreateGameResponse> {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(VotingSystem)
    private votingSystemRepository: Repository<VotingSystem>,
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
