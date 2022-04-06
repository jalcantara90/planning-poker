import { ApiProperty  } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateVotingSystemRequest {
  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  options: string[]
}
