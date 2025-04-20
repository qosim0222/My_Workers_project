import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, Matches } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Ali' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Valiyev'})
  @IsString()
  @IsNotEmpty()
  surName: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998\d{9}$/, {
    message: 'phoneNumber must match +998XXXXXXXXX format',
  })
  phone: string;

  @ApiProperty({ example:"chilonzor"  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "Salom, men siz bilan bog'lanmoqchiman." })
  @IsString()
  @IsNotEmpty()
  message: string;

}
