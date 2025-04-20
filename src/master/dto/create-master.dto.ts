import {
    IsString,
    IsBoolean,
    IsInt,
    IsArray,
    ValidateNested,
    IsOptional,
    IsNumber,
    IsNotEmpty,
    Matches,
    Min,
    Max,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateMasterProfessionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Kasb ID (UUID formatda)', example: 'be9c09ce-9c4f-4e60-9df5-fbcc6c4ed1b4' })
    professionId: string;
  
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ description: 'Minimal ish soatlari', example: 3, required: false })
    minWorkingHours?: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Daraja ID (UUID formatda)', example: 'b772d73d-5aa0-4c1f-bf5c-8fd9a621ffdd', required: false })
    levelId?: string;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: '1 soatlik ish haqi (so‘m)', example: 120000 })
    priceHourly: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: '1 kunlik ish haqi (so‘m)', example: 800000 })
    priceDaily: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Tajriba yillari', example: 5 })
    experience: number;
  }
  
  export class CreateMasterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Salim', description: 'Ustani ismi' })
    @Matches(/^[A-Za-z']+$/, { message: 'Ism faqat harflardan iborat bo‘lishi kerak.' })
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Boboev', description: 'Ustani familiyasi' })
    @Matches(/^[A-Za-z']+$/, { message: 'Familiya faqat harflardan iborat bo‘lishi kerak.' })
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '+998901234596', description: 'Telefon raqam (faqat +998 bilan)' })
    @Matches(/^\+998[0-9]{9}$/, {
      message: 'Telefon raqami +998XXXXXXXXX formatda bo‘lishi kerak',
    })
    phoneNumber: string;
  
    @IsOptional()
    @IsBoolean()
    @ApiProperty({ example: true, description: 'Faollik holati (true yoki false)', required: false })
    isActive?: boolean;
  
    @IsNotEmpty()
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    @ApiProperty({ example: 2000, description: 'Tug‘ilgan yil (masalan, 1985)' })
    birthYear: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'img/ustalar/ali.jpg', description: 'Ustaning rasmi joylashgan manzil' })
    img: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'img/passport/ali-passport.jpg', description: 'Ustaning pasport rasmi manzili' })
    passportImg: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '10 yillik tajribaga ega duradgor.', description: 'Usta haqida qisqacha ma’lumot' })
    about: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMasterProfessionDto)
    @ApiProperty({
      type: [CreateMasterProfessionDto],
      description: 'Ustaga tegishli kasblar royxati',
    })
    masterProfessions: CreateMasterProfessionDto[];
  }
  