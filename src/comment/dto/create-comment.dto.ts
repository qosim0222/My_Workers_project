import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'nice' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: '654541214512sds' })
  @IsUUID()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ example: [{ star: 4.5, master_id: '45dasa46s56s4a5' }] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MasterRatings)
  master_ratings: MasterRatings[];
}

export class MasterRatings {
  @ApiProperty({
    example: 4.5, minimum: 1, maximum: 5,})
  @IsNumber()
  @IsPositive()
  star: number;

  @ApiProperty({
    example: 'c1a2b3d4-5678-9012-3456-7890abcdef12'
  })
  @IsUUID()
  @IsNotEmpty()
  master_id: string;
}
