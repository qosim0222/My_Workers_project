import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ShowcaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateShowcaseDto) {
    try {
    

      const data = await this.prisma.showcase.create({ data: dto });

      return { message: 'Showcase created successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query?: {
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
        sortBy = 'id',
        sortOrder = 'desc',
        filter = {},
      } = query || {};

      const where: any = { ...filter };

      if (search) {
        where.OR = [
          { name_uz: { contains: search, mode: 'insensitive' } },
          { name_ru: { contains: search, mode: 'insensitive' } },
          { name_en: { contains: search, mode: 'insensitive' } },
        ]
      }

      const data = await this.prisma.showcase.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await this.prisma.showcase.count({ where });

      if (!data.length) {
        throw new NotFoundException('No showcases found!');
      }

      return {
        message: 'Showcases fetched successfully!',
        meta: { total, page, lastPage: Math.ceil(total / limit) },
        data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.showcase.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException("Showcase not found with the provided 'id'!");
      }

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateShowcaseDto) {
    try {
      const showcase = await this.prisma.showcase.findUnique({ where: { id } });

      if (!showcase) {
        throw new NotFoundException("Showcase not found with the provided 'id'!");
      }

   

      if (dto.image && dto.image !== showcase.image) {
        const oldImgPath = path.join('uploads', showcase.image);
        if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
      }

      const data = await this.prisma.showcase.update({
        where: { id },
        data: dto,
      });

      return { message: 'Showcase updated successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const showcase = await this.prisma.showcase.findUnique({ where: { id } });

      if (!showcase) {
        throw new NotFoundException("Showcase not found with the provided 'id'!");
      }

      const oldImgPath = path.join('uploads', showcase.image);
      if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);

      const data = await this.prisma.showcase.delete({ where: { id } });

      return { message: 'Showcase deleted successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) throw error;
    throw new BadRequestException(error.message);
  }
}
