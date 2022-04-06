import { ApiProperty } from '@nestjs/swagger';

export class GetAllVotingSystemResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly options: string[];

  constructor(
    id: string,
    name: string,
    options: string[]
  ) {
    this.id = id;
    this.name = name;
    this.options = options;
  }
}
