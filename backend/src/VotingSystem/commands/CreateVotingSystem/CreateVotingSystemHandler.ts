import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VotingSystem } from '@Data/Entities';

import { CreateVotingSystemCommand } from './CreateVotingSystemCommand';
import { CreateVotingSystemResponse } from './CreateVotingSystemResponse';

@CommandHandler(CreateVotingSystemCommand)
export class CreateVotingSystemHandler implements ICommandHandler<CreateVotingSystemCommand, CreateVotingSystemResponse> {
 
  constructor(
    @InjectRepository(VotingSystem)
    private votingSystemRepository: Repository<VotingSystem>,
  ) {}

  async execute(request: CreateVotingSystemCommand): Promise<CreateVotingSystemResponse> {
    const res = await this.votingSystemRepository.save({
     name: request.name,
     options: request.options.map((option) => ({ value: option }))
    });
    return new CreateVotingSystemResponse(res.id);
  }
}