import { ApiProperty } from '@nestjs/swagger';

export class VotingSystem {
  @ApiProperty() name: string;
  @ApiProperty() options: string[];
}

export class GetGameByIdResponse {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() votingSystem: VotingSystem;

  constructor(
    id: string,
    name: string,
    votingSystem: VotingSystem
  ) {
    this.id = id;
    this.name = name;
    this.votingSystem = votingSystem;
  }
}
