import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateAuthDto,
  LoginAuthDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EskizService } from 'src/eskiz/eskiz.service';
import * as DeviceDetector from 'device-detector-js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { totp } from 'otplib';
totp.options = { step: 600, digits: 5 };

@Injectable()
export class AuthService {
  private ACCKEY = process.env.ACCKEY || "ackes_key";
  private REFKEY = process.env.REFKEY || "ref_key";
  private OTPKEY = process.env.OTPKEY || "otp_key"; 
  private deviceDetector = new DeviceDetector();

  constructor(
    private prisma: PrismaService,
    private eskizService: EskizService,
    private jwtServices: JwtService,
  ) {}

  async register(dto: CreateAuthDto, otp: string) {
    const { phone, password, region_id } = dto;

    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { phone },
      });

      if (existingUser) {
        throw new ConflictException('Foydalanuvchi allaqachon mavjud');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: region_id },
      });

      if (!region) {
        throw new NotFoundException('Region topilmadi');
      }

      const isOtpValid = totp.check(otp, this.OTPKEY + phone);
      if (!isOtpValid) {
        throw new BadRequestException("OTP noto'g'ri yoki muddati tugagan");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.prisma.user.create({
        data: {
          ...dto,
          password: hashedPassword,
        },
      });

      return {
        message: 'Registiratsiya muvaffaqiyatli  ✅',
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'nimadur xato');
    }
  }


  async login(loginAuthDto: LoginAuthDto, req: Request) {
    const { phone, password } = loginAuthDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { phone } });
      if (!user) {
        throw new UnauthorizedException(' user topilmadi');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException("Telefon raqami yoki parol noto'g'ri");
      }

      // if (!user.status) {
      //   throw new ForbiddenException(
      //     'Sizning akkauntingiz faollashtirilmagan, iltimos akkauntingizni faollashtiring',
      //   );
      // }

      const session = await this.prisma.sessions.findFirst({
        where: { ip_address: req.ip, user_id: user.id },
      });

      if (!session) {
        const useragent: any = req.headers['user-agent'];
        const device = this.deviceDetector.parse(useragent);

        const newSession: any = {
          ip_address: req.ip,
          user_id: user.id,
          device: {},
        };

        await this.prisma.sessions.create({
          data: newSession,
        });
      }


      const payload = { id: user.id, role: user.role };
      const accessToken = this.genAccessToken(payload);
      const refreshToken = this.genRefreshToken(payload);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'nimadur xato');
    }
  }

  async sendOTP(sendOtpDto: SendOtpDto) {
    const { phone } = sendOtpDto;
    try {

      const otp = totp.generate(this.OTPKEY + phone);
      // await this.eskizService.sendSMS(otp, phone)

      return { data: 'OTP telefon raqamingizga yuborildi', otp };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'nimadur xato');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { phone, otp, newPassword } = resetPasswordDto;
    try {
      const isValid = totp.check(otp, this.OTPKEY + phone);
      if (!isValid) {
        throw new UnauthorizedException("OTP yoki telefon raqam noto'g'ri");
      }

      const hashedpassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { phone },
        data: { password: hashedpassword },
      });

      return { data: 'Parolingiz muvaffaqiyatli yangilandi' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'nimadur xato');
    }
  }

  refreshToken(req: Request) {
    const user = req['user'];
    try {
      const accessToken = this.genAccessToken({ id: user.id, role: user.role });

      return { accessToken };
    } catch (error) {
      throw new BadRequestException(error?.message || 'nimadur xato');
    }
  }
  
  
  
  async me_data(req: Request) {
    const user = req['user'];
    try {
      const session = await this.prisma.sessions.findFirst({
        where: { ip_address: req.ip, user_id: user.id },
      });
      
      if (!session) {
        throw new UnauthorizedException();
      }
      
      const data = await this.prisma.user.findUnique({
        where: { id: user.id },
        omit: { password: true },
        include: {
          Order: true,
          Basket: true,
          region: true,
          Comment: {
            include: { MasterRatings: { include: { Master: true } } },
          },
        },
      });
      
      return { data };
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
  
  
  
  async mysession(req: Request) {
    const user = req['user'];
    try {
      const sessions = await this.prisma.sessions.findMany({
        where: { user_id: user.id },
      });
      
      return { data: sessions };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }
  
  
  async deleteSessions(req: Request, id: string) {
    try { 
      const findSession = await this.prisma.sessions.findFirst({
        where: { id }, 
      });
      if (!findSession) throw new NotFoundException('Session not found ❗');
      
      await this.prisma.sessions.delete({ where: { id } });
      return { message: 'Session is successfully deleted ✅' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
    // async logout(req: Request) {
    //   const user = req['user'];
    //   try {
    //     await this.prisma.sessions.deleteMany({
    //       where: { ip_address: req.ip, user_id: user.id },
    //     });
  
    //     return { data: 'Muvaffaqiyatli ravishda tizimdan chiqdingiz' };
    //   } catch (error) {
    //     throw new BadRequestException(error?.message || 'nimadur xato');
    //   }
    // }
  
  genAccessToken(payload: any) {
    return this.jwtServices.sign(payload, {
      secret: this.ACCKEY,
      expiresIn: '2h',
    });
  }

  genRefreshToken(payload: any) {
    return this.jwtServices.sign(payload, {
      secret: this.REFKEY,
      expiresIn: '5d',
    });
  }

  
  
} 