import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { VotingSystemEntity } from '@infrastructure/entities';

import { GetAllVotingSystemResponse } from './get-all-coting-system.response';
import { GetAllVotingSystemCommand } from './get-all-voting-system.command';

@CommandHandler(GetAllVotingSystemCommand)
export class GetAllVotingHandler implements ICommandHandler<GetAllVotingSystemCommand, GetAllVotingSystemResponse[]> {
  
  constructor(
    @InjectRepository(VotingSystemEntity)
    private votingSystemRepository: Repository<VotingSystemEntity>,
  ) {}

  async execute(command: GetAllVotingSystemCommand): Promise<GetAllVotingSystemResponse[]> {
    const votingSystem = await this.votingSystemRepository.find(
      {
        join: {
          alias: "votingSystem",
          innerJoinAndSelect: {
            options: 'votingSystem.options'
          },
        },
    });

    return votingSystem.map(vs => 
      new GetAllVotingSystemResponse(
        vs.name,
        vs.options.map(({ value }) => value)
      )
    );
  }
}