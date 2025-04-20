import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'savol' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 'javob' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
