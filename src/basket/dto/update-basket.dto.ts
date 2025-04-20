import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    IsEnum,
  } from 'class-validator';
  import { TimeUnit } from '@prisma/client';
  import { ApiProperty } from '@nestjs/swagger';
  
  // Savatchani yangilash uchun DTO (faqat kerakli maydonlar yuboriladi)
  export class UpdateBasketDto {
    @ApiProperty({ example: 'kasbning-uuid-si', required: false })
    @IsOptional()
    @IsString()
    // Kasb ID (agar foydalanuvchi kasb tanlagan bo‘lsa)
    professionId?: string;
  
    @ApiProperty({ example: 'tool-uuid-si', required: false })
    @IsOptional()
    @IsString()
    // Asbob ID (agar foydalanuvchi asbob tanlagan bo‘lsa)
    toolId?: string;
  
    @ApiProperty({ example: 'darajaning-uuid-si', required: false })
    @IsOptional()
    @IsString()
    // Daraja ID (masalan: Boshlang‘ich, O‘rta, Yuqori)
    levelId?: string;
  
    @ApiProperty({ example: 1, description: 'Soni', required: false, minimum: 1 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    // Mahsulot soni (kamida 1 bo‘lishi kerak)
    quantity?: number;
  
    @ApiProperty({
      enum: TimeUnit,
      example: 'HOURLY',
      required: false,
      description: 'Vaqt birligi (soatlik yoki kunlik)',
    })
    @IsOptional()
    @IsEnum(TimeUnit)
    // Ish vaqti birligi: HOURLY (soatlik) yoki DAILY (kunlik)
    timeUnit?: TimeUnit;
  
    @ApiProperty({
      example: 8,
      description: 'Ish vaqti (soat yoki kun)',
      required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    workingTime?: number;
  
    @ApiProperty({
      example: 100.5,
      description: 'Narxi',
      required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)

    price?: number;
  }
  