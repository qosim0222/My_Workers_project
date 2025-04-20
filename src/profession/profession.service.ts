import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ProfessionService {
  constructor(private readonly prisma: PrismaService) {}


  async create(dto: CreateProfessionDto) {
    try {
      const { professionTools, professionLevels, ...body } = dto;
  
      // Check if a profession with the same nameUz exists
      const exists = await this.prisma.profession.findFirst({
        where: { nameUz: body.nameUz },
      });
      if (exists) {
        throw new ConflictException('Profession with this name already exists.');
      }
  
      // Validate professionTools
      if (professionTools?.length) {
        const validTools = await this.prisma.tool.findMany({
          where: { id: { in: professionTools } },
        });
        if (validTools.length !== professionTools.length) {
          throw new BadRequestException('One or more tool IDs are invalid.');
        }
      }
  
      // Validate professionLevels
      const levelIds = professionLevels?.map(level => level.levelId) ?? [];
      if (levelIds.length) {
        const validLevels = await this.prisma.level.findMany({
          where: { id: { in: levelIds } },
        });
        if (validLevels.length !== levelIds.length) {
          throw new BadRequestException('One or more level IDs are invalid.');
        }
      }
  
      // Create Profession record
      const profession = await this.prisma.profession.create({
        data: {
          ...body,
        },
      });

      // Create related ProfessionTool records manually
      if (professionTools?.length) {
        const professionToolData = professionTools.map(toolId => ({
          professionId: profession.id,
          toolId: toolId, // Use toolId from professionTools array
        }));
  
        await this.prisma.professionTool.createMany({
          data: professionToolData,
        });
      }

      // Create related ProfessionLevel records if professionLevels are provided
      if (professionLevels?.length) {
        const levelData = professionLevels.map(level => ({
          professionId: profession.id,
          ...level, // Spread the level object to add the professionId
        }));
  
        // Insert the ProfessionLevel data
        await this.prisma.professionLevel.createMany({ data: levelData });
      }
  
      return { message: 'Profession created successfully!', data: profession };
    } catch (error) {
     
          throw new ConflictException('A unique constraint violation occurred.');
        }
  }  

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isActive?: boolean;
  }) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        isActive,
      } = params;

      const where: any = {};
      if (search) {
        where.OR = [
          { nameUz: { contains: search, mode: 'insensitive' } },
          { nameRu: { contains: search, mode: 'insensitive' } },
          { nameEn: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (typeof isActive === 'boolean') {
        where.isActive = isActive;
      }

      const [data, total] = await this.prisma.$transaction([
        this.prisma.profession.findMany({
          where,
          include: {
            professionTools: true,
            professionLevels: true,
          },
          orderBy: { [sortBy]: sortOrder },
          skip: (page - 1) * limit,
          take: +limit,
        }),
        this.prisma.profession.count({ where }),
      ]);

      if (!data.length) {
        throw new NotFoundException('Professions not found.');
      }

      return {
        data,
        total,
        currentPage: +page,
        totalPages: Math.ceil(total / +limit),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const profession = await this.prisma.profession.findUnique({
        where: { id },
        include: {
          professionTools: true,
          professionLevels: true,
        },
      });
      if (!profession) {
        throw new NotFoundException('Profession not found with the provided ID.');
      }
      return profession;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateProfessionDto) {
    try {
      const existing = await this.prisma.profession.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Profession not found with the provided ID.');
      }
  
      const { img, professionTools, professionLevels, ...body } = dto;
  
      // Delete old image if new one provided
      if (img && existing.img && img !== existing.img) {
        await this.removeImage(existing.img);
      }
  
      // Validate professionTools
      if (professionTools?.length) {
        const validTools = await this.prisma.tool.findMany({
          where: { id: { in: professionTools } },
        });
        if (validTools.length !== professionTools.length) {
          throw new BadRequestException('One or more tool IDs are invalid.');
        }
      }
  
      // Validate professionLevels
      if (professionLevels?.length) {
        // Filter out undefined levelIds
        const levelData = professionLevels
          .map(level => {
            // Ensure levelId is a valid string
            if (level.levelId) {
              return {
                professionId: id,
                levelId: level.levelId,
                minWorkingHours: level.minWorkingHours ?? 0,  // Add default values if needed
                priceHourly: level.priceHourly ?? 0,  // Add default values
                priceDaily: level.priceDaily ?? 0,  // Add default values
              };
            }
            return null;  // Exclude invalid levelIds
          })
          .filter(level => level !== null) as { professionId: string; levelId: string; minWorkingHours: number; priceHourly: number; priceDaily: number }[];  // Cast as array of valid level data
  
        if (levelData.length) { 
          const validLevels = await this.prisma.level.findMany({
            where: { id: { in: levelData.map(level => level.levelId) } },
          });
          if (validLevels.length !== levelData.length) {
            throw new BadRequestException('One or more level IDs are invalid.');
          }
         }
        

        // Check if there is any valid levelData to create
        if (levelData.length) {

          await this.prisma.professionLevel.deleteMany({
            where: { professionId: id },
          });

          await this.prisma.professionLevel.createMany({ data: levelData });
        }
      }
  
      // Update the profession record
      const updated = await this.prisma.profession.update({
        where: { id },
        data: {
          ...body,
          img: img ?? existing.img,
        },
      });

      if (professionTools?.length) {

        await this.prisma.professionTool.deleteMany({
          where: { professionId: id },
        });

        const professionToolData = professionTools.map(toolId => ({
          professionId: updated.id,
          toolId: toolId, // Use toolId from professionTools array
        }));
  
        await this.prisma.professionTool.createMany({
          data: professionToolData,
        });
      }

  
      return { message: 'Profession updated successfully', data: updated };
    } catch (error) {
      this.handleError(error);
    }
  }
  
  

  async remove(id: string) {
    try {
      const existing = await this.prisma.profession.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Profession not found.');
      }

      if (existing.img) {
        await this.removeImage(existing.img);
      }

      const data = await this.prisma.profession.delete({ where: { id } });

      if (!data) {
        throw new BadRequestException('Failed to delete profession.');
      }

      return { message: 'Profession deleted successfully', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private async removeImage(imgPath: string) {
    try {
      const filePath = path.join('uploads', imgPath);
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Failed to delete image:', err.message);
    }
  }

  private handleError(error: any) {
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException ||
      error instanceof ConflictException
    ) {
      throw error;
    }
    console.error(error);
    throw new InternalServerErrorException('Internal server error');
  }
}





