import { ApiProperty } from '@nestjs/swagger';

export class CreateVotingSystemResponse {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
