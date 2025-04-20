import {
    IsString,
    IsBoolean,
    IsNumber,
    IsArray,
    ValidateNested,
    IsOptional,
    IsEnum,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  import { PaymentType, OrderStatus, TimeUnit } from '@prisma/client';
 
  
  export class UpdateOrderDto {
   
    @IsOptional()
    @IsEnum(OrderStatus)
    @ApiProperty({ example: 'ACTIVE', enum: OrderStatus, description: 'Order status', required: false })
    status?: OrderStatus;
  
    @IsOptional()
    @IsArray()
    @ApiProperty({
      type: [String],
      required: false,
      description: 'List of master IDs for assigning masters (ADMIN only)',
    })
    masterIds?: string[];
  }