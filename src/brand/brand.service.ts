import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      if (!createBrandDto.name_uz) {
        throw new BadRequestException('Brand nameUz is required!');
      }

      const existing = await this.prisma.brand.findFirst({
        where: { name_uz: createBrandDto.name_uz },
      });

      if (existing) {
        throw new ConflictException('Brand already exists with this name!');
      }

      const data = await this.prisma.brand.create({
        data: createBrandDto,
      });

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof typeof this.prisma.brand.fields;
    sortOrder?: 'asc' | 'desc';
    filter?: { [key: string]: any };
  }) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'id',
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

      const data = await this.prisma.brand.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await this.prisma.brand.count({ where });

      // if (!data.length) {
      //   throw new NotFoundException('No brands found!');
      // }

      return {
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
        data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.brand.findUnique({
        where: { id },
        include: { Tool: true },
      });

      if (!data) {
        throw new NotFoundException("Brand not found with the provided 'id'!");
      }

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.prisma.brand.findUnique({ where: { id } });

      if (!brand) {
        throw new NotFoundException("Brand not found with the provided 'id'!");
      }

      if (updateBrandDto.name_uz) {
        const existing = await this.prisma.brand.findFirst({
          where: {
            name_uz: updateBrandDto.name_uz,
            NOT: { id },
          },
        });

        if (existing) {
          throw new ConflictException('Brand with this name already exists!');
        }
      }

      const data = await this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
      });

      return { message: 'Brand updated successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const brand = await this.prisma.brand.findUnique({ where: { id } });

      if (!brand) {
        throw new NotFoundException("Brand not found with the provided 'id'!");
      }

      const data = await this.prisma.brand.delete({ where: { id } });

      return { message: 'Brand deleted successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }
}
