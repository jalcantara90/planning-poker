import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';

import { VotingSystem, VotingSystemOption } from '@infrastructure/entities';

import { VotingSystemController } from './controller/voting-system.controller';
import { GetAllVotingHandler } from './queries/get-all-voting-system/get-all-voting-system.handler';
import { CreateVotingSystemHandler } from './commands/create-voting-system/create-voting-system.handler';

const handlers = [
  CreateVotingSystemHandler,
  GetAllVotingHandler
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([VotingSystem, VotingSystemOption])
  ],
  providers: [
    ...handlers,
    Logger
  ],
  controllers: [VotingSystemController]
})
export class VotingSystemModule {}
