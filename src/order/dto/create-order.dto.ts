import {
    IsString,
    IsBoolean,
    IsNumber,
    IsArray,
    ValidateNested,
    IsOptional,
    IsEnum,
    IsNotEmpty,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  import { PaymentType, TimeUnit } from '@prisma/client';
  
  export class CreateOrderProductDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: '6f77c851-4b3b-4f47-9bc4-7e1f32274f3a', description: 'Kasb ID (UUID formatda)', required: false })
    professionId?: string;
  
    @IsOptional()
    @IsString()
    // @ApiProperty({ example: '3c91d4e2-8343-4c3b-b1b3-9fbc32288cd0', description: 'Asbob ID (UUID formatda)', required: false })
    toolId?: string;
  
    @IsOptional()
    @IsString()
    @ApiProperty({ example: '2f98a123-ef36-4725-9ed3-2e8c23cf9a91', description: 'Daraja ID (UUID formatda)', required: false })
    levelId?: string;
  
    @IsNumber()
    @ApiProperty({ description: 'Buyurtma miqdori', example: 1 })
    quantity: number;
  
    @IsEnum(TimeUnit)
    @ApiProperty({ enum: TimeUnit, description: 'Vaqt birligi (HOURLY yoki DAILY)' })
    timeUnit: TimeUnit;
  
    @IsNumber()
    @ApiProperty({ description: 'Ish vaqti (soat/kundalik)', example: 12 })
    workingTime: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Narx (so‘m)', example: 2500000 })
    price: number;
  }
  
  export class CreateOrderDto {
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Yetkazib berish manzili', example: 'Toshkent shahri, Chilonzor tumani, 5-mavze, 23-uy' })
    address: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Kenglik (latitude)', example: '3111' })
    latitude: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Uzunlik (longitude)', example: '2797' })
    longitude: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Buyurtma sanasi', example: '2025-04-20T14:30:00Z' })
    date: string;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Jami narx (so‘m)', example: 700000 })
    totalPrice: number;
  
    @IsNotEmpty()
    @IsEnum(PaymentType)
    @ApiProperty({ example: 'CLICK', enum: PaymentType, description: 'To‘lov turi (CASH, CLICK, PAYME)' })
    paymentType: PaymentType;
  
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: 'Yetkazib berish kerakmi', example: true })
    withDelivery: boolean;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Yetkazib berish bo‘yicha izoh', example: 'Eshik oldiga qoldiring' })
    deliveryComment: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderProductDto)
    @ApiProperty({
      type: [CreateOrderProductDto],
      description: 'Buyurtma qilingan mahsulotlar ro‘yxati',
    })
    orderProducts: CreateOrderProductDto[];
  }
  