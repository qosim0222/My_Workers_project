import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
    @ApiProperty({ example: 'Samarqand' })
    @IsNotEmpty()
    @IsString()
    name_uz: string;

    @ApiProperty({ example: 'Samarqand' })
    @IsNotEmpty()
    @IsString()
    name_ru: string;

    @ApiProperty({ example: 'Samarqand' })
    @IsNotEmpty()
    @IsString()
    name_en: string;
}
