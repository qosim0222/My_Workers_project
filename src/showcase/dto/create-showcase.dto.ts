import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShowcaseDto {
  @ApiProperty({ example: 'show' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'show' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'show' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'nimadur ' })
  @IsString()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty({ example: 'nimadur ' })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({ example: 'nimadur ' })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({ example: 'image.png' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'link' })
  @IsString()
  @IsNotEmpty()
  link: string;
}
