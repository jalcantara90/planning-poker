import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';

import { VotingSystemEntity, VotingSystemOptionEntity } from '@infrastructure/entities';

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
    TypeOrmModule.forFeature([VotingSystemEntity, VotingSystemOptionEntity])
  ],
  providers: [
    ...handlers,
    Logger
  ],
  controllers: [VotingSystemController]
})
export class VotingSystemModule {}
