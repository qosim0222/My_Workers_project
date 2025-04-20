import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
   
      const data = await this.prisma.size.create({
        data: createSizeDto,
      });

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
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
      } = query;

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

      const data = await this.prisma.size.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await this.prisma.size.count({ where });

      if (!data.length) {
        throw new NotFoundException('No sizes found!');
      }

      return {
        message: 'Sizes fetched successfully!',
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
      const data = await this.prisma.size.findUnique({
        where: { id },
      });

      if (!data) {
        throw new NotFoundException('Size not found');
      }

      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      const data = await this.prisma.size.update({
        where: { id },
        data: updateSizeDto,
      });
      if (!data) {
        return new NotFoundException('size not found');
      }
      return { data };
    } catch (error) {
     
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.size.delete({
        where: { id },
      });
      if (!data) {
        throw new NotFoundException('Size not found');
      }
      return { data };
    } catch (error) {
     
      throw new BadRequestException(error.message);
    }
  }
}
