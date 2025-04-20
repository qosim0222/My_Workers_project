

import { Controller, Post, Body, Req, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  LoginAuthDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/create-auth.dto';
import { Request } from 'express';
import { Roles } from 'src/guards/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';
import { RefreshGuard } from 'src/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register/:otp')
  register(
    @Param('otp') otp: string,
    @Body() createAuthDto: CreateAuthDto,
  ) {
    return this.authService.register(createAuthDto, otp);
  }


  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto, @Req() req: Request) {
    return this.authService.login(loginAuthDto, req);
  }

  @Post('send-otp')
  sendOTP(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOTP(sendOtpDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  // @UseGuards(AuthGuard)
  // @Post('logout')
  // logout(@Req() req: Request) {
  //   return this.authService.logout(req);
  // }

  @UseGuards(AuthGuard)
  @Get('my_data')
  me(@Req() req: Request) {
    return this.authService.me_data(req);
  }

  
  @UseGuards(AuthGuard)
  @Get('my_sessions')
  mysession(@Req() req: Request) {
    return this.authService.mysession(req);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete_sessions/:id')
  deleteSessions(@Req() req: Request, @Param('id') id: string) {
    return this.authService.deleteSessions(req, id);
  }
}