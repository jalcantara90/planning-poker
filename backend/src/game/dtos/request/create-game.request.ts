import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

import { VotingSystem } from '@infrastructure/types';

export class CreateGameRequest {
  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  @IsEnum(VotingSystem)
  @IsNumber()
  @IsNotEmpty()
  votingSystem: VotingSystem;
}
