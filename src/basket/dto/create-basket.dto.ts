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
    // Kasb ID (majburiy emas)
    professionId?: string;
  
    // @ApiProperty({ example: 'tool-uuid-si', required: false })
    @IsOptional()
    @IsString()
    // Asbob ID (majburiy emas)
    toolId?: string;
  
    @ApiProperty({ example: 'darajaning-uuid-si', required: false })
    @IsOptional()
    @IsString()
    // Daraja ID (masalan: Boshlang‘ich, O‘rta, Yuqori — majburiy emas)
    levelId?: string;
  
    @ApiProperty({ example: 3, description: 'Soni', minimum: 1 })
    @IsNumber()
    @Min(1)
    // Mahsulotlar soni (kamida 1 bo‘lishi shart)
    quantity: number;
  
    @ApiProperty({
      enum: TimeUnit,
      example: 'HOURLY',
      description: 'Vaqt birligi (soatlik yoki kunlik)',
    })
    @IsEnum(TimeUnit)
    // Ish vaqti birligi: HOURLY (soatlik) yoki DAILY (kunlik)
    timeUnit: TimeUnit;
  
    @ApiProperty({
      example: 9,
      description: 'Ish vaqti (soat yoki kunlarda ifodalangan)',
    })
    @IsNumber()
    @Min(0)
    // Umumiy ish vaqti (0 va undan katta bo‘lishi kerak)
    workingTime: number;
  
    @ApiProperty({ example: 120, description: 'Narxi' })
    @IsNumber()
    @Min(0)
    // Mahsulot (yoki xizmat) narxi (0 va undan katta bo‘lishi kerak)
    price: number;
  }
  