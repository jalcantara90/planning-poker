import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateGameHandler } from './commands/create-game/create-game.handler';
import { GameController } from './controller/game.controller';

const handlers = [
  CreateGameHandler
];

@Module({
  imports: [
    CqrsModule,
    
  ],
  providers: [
    ...handlers,
    Logger
  ],
  controllers: [GameController]
})
export class GameModule {}
