import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
  @ApiProperty({ example: 'Saturn' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  fullname: string;

  @ApiProperty({ example: '+998995931207' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{2}\d{7}$/, {
    message: 'The phone number format must be only: +998901234567.',
  })
  phone: string;

  @ApiProperty({ example: '1207' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: 'region_id' })
  @IsString()
  @IsNotEmpty()
  region_id: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  role: Role;

 
  @IsOptional()
  @IsString()
  inn?: string;

 
  @IsOptional()
  @IsString()
  mfo?: string;

 
  @IsOptional()
  @IsString()
  rs?: string;

 
  @IsOptional()
  @IsString()
  bank?: string;

 
  @IsOptional()
  @IsString()
  oked?: string;

 
  @IsOptional()
  @IsString()
  address?: string;
}

export class LoginAuthDto {
  @ApiProperty({ example: '+998995931207' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '1207' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SendOtpDto {
  @ApiProperty({ example: '+998995931207' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: '+998995931207' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '09121' })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({ example: '0222' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

