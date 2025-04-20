import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSizeDto {
    @ApiProperty({ example: 'Kichik' })
    @IsString()
    @IsNotEmpty()
    name_uz: string;
  
    @ApiProperty({ example: 'Маленький' })
    @IsString()
    @IsNotEmpty()
    name_ru: string;
  
    @ApiProperty({ example: 'Small' })
    @IsString()
    @IsNotEmpty()
    name_en: string;
}
