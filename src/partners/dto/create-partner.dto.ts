import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ example: 'Nomi (uz)' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Название (ru)' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'Name (en)', })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;
}
