import { CommandHandler, ICommandHandler} from '@nestjs/cqrs';

import { CreateGameCommand } from './create-game.command';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
  constructor() {}

  async execute(command: CreateGameCommand) {
    return Promise.resolve({
      ...command
    });
  }
}
