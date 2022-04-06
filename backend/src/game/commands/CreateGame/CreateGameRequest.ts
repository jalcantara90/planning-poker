import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGameRequest {
  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  votingSystemId: string;
}
