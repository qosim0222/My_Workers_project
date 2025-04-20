import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { UpdateAuthDto } from "src/auth/dto/update-auth.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: { [key: string]: any };
  }) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        filter = {},
      } = query || {};

      const where: any = {
        role: { in: [Role.ADMIN, Role.USER_YUR, Role.SUPER_ADMIN,] },
        ...filter,
      };

      if (search) {
        where.OR = [
          { fullname: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ];
      }

      const data = await this.prisma.user.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          region: true,
          Sessions: true,
          Order: true,
          Basket: true,
          Contact: true,
          Comment: true
        },
        omit: {
          password: true,
        }
      });

      const total = await this.prisma.user.count({ where });

      return {
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          region: true,
          Sessions: true,
          Order: true,
          Basket: true,
          Contact: true,
          Comment: true
        },
        omit: { password: true },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      return { data: user };
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async update(id: string, updateUserDto: UpdateAuthDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: updateUserDto.region_id },
      });

      if (!region) {
        throw new NotFoundException('Region not found');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return { data: updatedUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const deletedUser = await this.prisma.user.delete({ where: { id } });

      return { data: deletedUser };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}