import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PowerService {
  constructor(private prisma: PrismaService) {}

  async create(createPowerDto: CreatePowerDto) {
    try {
      const data = await this.prisma.power.create({
        data: createPowerDto,
      });
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof typeof this.prisma.power.fields;
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
        ...filter,
      };

      if (search) {
        where.OR = [
          { name_uz: { contains: search, mode: 'insensitive' } },
          { name_ru: { contains: search, mode: 'insensitive' } },
          { name_en: { contains: search, mode: 'insensitive' } },
        ];
      }

      const data = await this.prisma.power.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include:{Tool:true}
      });

      const total = await this.prisma.power.count({ where });

      if (!data.length) {
        throw new NotFoundException('No power records found!');
      }

      return {
        message: 'Power list fetched successfully!',
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findOne(id: string) {
    try {
      const data = await this.prisma.power.findUnique({
        where: { id },
        include:{Tool:true}
      });

      if (!data) {
        throw new NotFoundException('Power not found');
      }

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePowerDto: UpdatePowerDto) {
    try {
      const data = await this.prisma.power.update({
        where: { id },
        data: updatePowerDto,
      });

      if (!data) {
        throw new NotFoundException('Power not found');
      }

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.power.delete({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Power not found');
      }

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
