import { ApiProperty } from '@nestjs/swagger';

export class GetAllVotingSystemResponse {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly options: string[];

  constructor(
    name: string,
    options: string[]
  ) {
    this.name = name;
    this.options = options;
  }
}
