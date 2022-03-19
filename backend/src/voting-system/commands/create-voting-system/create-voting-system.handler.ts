import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VotingSystem } from '@infrastructure/entities';

import { CreateVotingSystemCommand } from './create-voting-system.command';
import { CreateVotingSystemResponse } from './create-voting-system.response';

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