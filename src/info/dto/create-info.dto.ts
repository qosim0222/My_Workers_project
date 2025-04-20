import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateInfoDto {
  @ApiProperty({ example: 'kimdur@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({example:"link"}) 
  @IsString()
  @IsNotEmpty()
  links: string;

  @ApiProperty({ example: ['+99890255545', '+99899123454'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone: string[];
}
