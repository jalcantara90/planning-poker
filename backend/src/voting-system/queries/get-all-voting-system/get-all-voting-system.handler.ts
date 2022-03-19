import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

import { VotingSystem } from '@infrastructure/entities';

import { GetAllVotingSystemCommand } from './get-all-voting-system.command';
import { GetAllVotingSystemResponse } from './get-all-voting-system.response';

@CommandHandler(GetAllVotingSystemCommand)
export class GetAllVotingHandler implements ICommandHandler<GetAllVotingSystemCommand, GetAllVotingSystemResponse[]> {
  
  constructor(
    @InjectRepository(VotingSystem)
    private votingSystemRepository: Repository<VotingSystem>,
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
        vs.id,
        vs.name,
        vs.options.map(({ value }) => value)
      )
    );
  }
}