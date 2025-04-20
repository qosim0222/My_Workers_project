import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt, IsBoolean, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
  // Asbob nomi (o'zbekcha)
  @ApiProperty({ description: 'O‘zbek tilidagi nomi', example: 'Drill' })
  @IsNotEmpty({ message: 'nameUz bo‘sh bo‘lmasligi kerak' })
  @IsString({ message: 'nameUz matn bo‘lishi kerak' })
  nameUz: string;

  // Asbob nomi (ruscha) - ixtiyoriy
  @ApiProperty({ description: 'Rus tilidagi nomi', example: 'Дрель', required: false })
  @IsOptional()
  @IsString({ message: 'nameRu matn bo‘lishi kerak' })
  @Matches(/^[А-Яа-яЁё0-9\s.,'"“”‘’!?()\-–—]+$/, {
    message: 'nameRu faqat kirill harflar va belgilardan iborat bo‘lishi mumkin',
  })
  nameRu?: string;

  // Asbob nomi (inglizcha) - ixtiyoriy
  @ApiProperty({ description: 'Ingliz tilidagi nomi', example: 'Drill', required: false })
  @IsOptional()
  @IsString({ message: 'nameEn matn bo‘lishi kerak' })
  nameEn?: string;

  // Asbob tavsifi (o'zbekcha)
  @ApiProperty({ description: 'O‘zbek tilidagi tavsifi', example: 'Elektron burg‘ulash asbobi' })
  @IsNotEmpty({ message: 'descriptionUz bo‘sh bo‘lmasligi kerak' })
  @IsString({ message: 'descriptionUz matn bo‘lishi kerak' })
  descriptionUz: string;

  // Tavsif (ruscha) - ixtiyoriy
  @ApiProperty({ description: 'Rus tilidagi tavsifi', example: 'Электронная дрель', required: false })
  @IsOptional()
  @IsString({ message: 'descriptionRu matn bo‘lishi kerak' })
  descriptionRu?: string;

  // Tavsif (inglizcha) - ixtiyoriy
  @ApiProperty({ description: 'Ingliz tilidagi tavsifi', example: 'Electronic drilling tool', required: false })
  @IsOptional()
  @IsString({ message: 'descriptionEn matn bo‘lishi kerak' })
  descriptionEn?: string;

  // Narxi
  @ApiProperty({ description: 'Asbob narxi', example: 150.75 })
  @IsNotEmpty({ message: 'price bo‘sh bo‘lmasligi kerak' })
  @IsNumber({}, { message: 'price raqam bo‘lishi kerak' })
  price: number;

  // Mavjud soni
  @ApiProperty({ description: 'Mavjud miqdori', example: 10 })
  @IsNotEmpty({ message: 'quantity bo‘sh bo‘lmasligi kerak' })
  @IsInt({ message: 'quantity butun son bo‘lishi kerak' })
  quantity: number;

  // Brend ID - ixtiyoriy
  @ApiProperty({ description: 'Brend ID', required: false })
  @IsOptional()
  @IsString({ message: 'brandId matn bo‘lishi kerak' })
  brandId?: string;

  // Quvvat ID - ixtiyoriy
  @ApiProperty({ description: 'Quvvat ID', required: false })
  @IsOptional()
  @IsString({ message: 'powerId matn bo‘lishi kerak' })
  powerId?: string;

  // O‘lcham ID - ixtiyoriy
  @ApiProperty({ description: 'O‘lcham ID', required: false })
  @IsOptional()
  @IsString({ message: 'sizeId matn bo‘lishi kerak' })
  sizeId?: string;

  // Rasm nomi
  @ApiProperty({ description: 'Rasm fayl nomi', example: 'drill.jpg' })
  @IsNotEmpty({ message: 'img bo‘sh bo‘lmasligi kerak' })
  @IsString({ message: 'img matn bo‘lishi kerak' })
  img: string;

  // Mavjudlik holati - ixtiyoriy
  @ApiProperty({ description: 'Asbob mavjudligi', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'isAvailable boolean (true/false) bo‘lishi kerak' })
  isAvailable?: boolean;

  @ApiProperty({ description: 'Sig‘im (capacity) ID', example: 'uuid-string' })
  @IsString({ message: 'capacityId matn bo‘lishi kerak' })
  @IsOptional()
  capacityId?: string;
}
