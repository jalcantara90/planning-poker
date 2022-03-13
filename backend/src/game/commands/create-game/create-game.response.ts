import { ApiProperty } from '@nestjs/swagger';

export class CreateGameResponse {
  @ApiProperty() readonly id: string

  constructor(id: string) {
    this.id = id;
  }
}
