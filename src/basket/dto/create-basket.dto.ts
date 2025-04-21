import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    IsEnum,
  } from 'class-validator';
  import { TimeUnit } from '@prisma/client';
  import { ApiProperty } from '@nestjs/swagger';
  
  // Savatchaga mahsulot (yoki xizmat) qo‘shish uchun DTO
  export class CreateBasketDto {
    @ApiProperty({ example: 'kasbning-uuid-si', required: false })
    @IsOptional()
    @IsString()
    professionId?: string;
  
    // @ApiProperty({ example: 'tool-uuid-si', required: false })
    @IsOptional()
    @IsString()
    toolId?: string;
  
    @ApiProperty({ example: 'darajaning-uuid-si', required: false })
    @IsOptional()
    @IsString()
    levelId?: string;
  
    @ApiProperty({ example: 3, description: 'Soni', minimum: 1 })
    @IsNumber()
    @Min(1)
    quantity: number;
  
    @ApiProperty({
      enum: TimeUnit,
      example: 'HOURLY',
      description: 'Vaqt birligi (soatlik yoki kunlik)',
    })
    @IsEnum(TimeUnit)
    timeUnit: TimeUnit;
  
    @ApiProperty({
      example: 9,
      description: 'Ish vaqti (soat yoki kunlarda ifodalangan)',
    })
    @IsNumber()
    @Min(0)
    workingTime: number;
  
    @ApiProperty({ example: 120, description: 'Narxi' })
    @IsNumber()
    @Min(0)
    // Mahsulot (yoki xizmat) narxi (0 va undan katta bo‘lishi kerak)
    price: number;
  }
  