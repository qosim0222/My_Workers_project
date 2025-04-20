import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    try {
    

      const data = await this.prisma.partner.create({
        data: createPartnerDto,
      });

      return { message: 'Partner created successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof typeof this.prisma.partner.fields;
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

      const where: any = { ...filter };

      if (search) {
        where.OR = [
          { name_uz: { contains: search, mode: 'insensitive' } },
          { name_ru: { contains: search, mode: 'insensitive' } },
          { name_en: { contains: search, mode: 'insensitive' } },
        ];
      }

      const data = await this.prisma.partner.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await this.prisma.partner.count({ where });

      if (!data.length) {
        throw new NotFoundException('No partners found!');
      }

      return {
        message: 'Partners fetched successfully!',
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
      const data = await this.prisma.partner.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException("Partner not found with the provided 'id'!");
      }

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { id } });

      if (!partner) {
        throw new NotFoundException("Partner not found with the provided 'id'!");
      }

    

      if (updatePartnerDto.image && updatePartnerDto.image !== partner.image) {
        const oldImagePath = path.join(process.cwd(), 'uploads', partner.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const data = await this.prisma.partner.update({
        where: { id },
        data: updatePartnerDto,
      });

      return { message: 'Partner updated successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { id } });

      if (!partner) {
        throw new NotFoundException("Partner not found with the provided 'id'!");
      }

      const filePath = path.join(process.cwd(), 'uploads', partner.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      const data = await this.prisma.partner.delete({ where: { id } });

      return { message: 'Partner deleted successfully!', data };
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
