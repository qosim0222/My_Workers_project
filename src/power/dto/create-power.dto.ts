import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePowerDto {
  @ApiProperty({ example: 'Quvvatli' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Мощный' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Powerful' })
  @IsString()
  @IsNotEmpty()
  name_en: string;
}
