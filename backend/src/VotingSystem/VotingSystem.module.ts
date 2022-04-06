import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';

import { VotingSystem, VotingSystemOption } from '@Data/Entities';

import { VotingSystemController } from './controller/VotingSystem.controller';
import { GetAllVotingHandler } from './queries/GetAllVotingSystem/GetAllVotingSystemHandler';
import { CreateVotingSystemHandler } from './commands/CreateVotingSystem/CreateVotingSystemHandler';

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
