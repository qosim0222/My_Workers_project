import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Role } from '@prisma/client';
import { TgBotService } from 'src/tg_bot/tg_bot.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService,
    private readonly tgBotervice: TgBotService

  ) { }


  async create(dto: CreateOrderDto, userId: string) {
    try {
      const { orderProducts, ...body } = dto;

      // Validate orderProducts
      if (!orderProducts?.length) {
        throw new BadRequestException('Order must include at least one product.');
      }

      for (const product of orderProducts) {
        if (product.professionId && product.toolId) {
          throw new BadRequestException(
            "professionId kerak "
            // 'Only one of professionId or toolId can be provided per order product.',
          );
        }
        if (!product.professionId && !product.toolId) {
          throw new BadRequestException(
            'Either professionId must be provided for each order product.',
          );
        }
      }

      // Validate professionIds and toolIds and levelIds
      const professionIds = orderProducts
        .filter(op => op.professionId !== undefined)
        .map(op => op.professionId)
        .filter(id => id !== undefined);

      const toolIds = orderProducts
        .filter(op => op.toolId !== undefined)
        .map(op => op.toolId)
        .filter(id => id !== undefined);

      let levelIds = orderProducts
        .filter(op => op.levelId !== undefined)
        .map(op => op.levelId)
        .filter(id => id !== undefined);

      levelIds = Array.from(new Set(levelIds));

      const validProfessions = await this.prisma.profession.findMany({
        where: { id: { in: professionIds } },
      });
      if (validProfessions.length !== professionIds.length) {
        throw new BadRequestException('One or more profession IDs are invalid.');
      }

      const validTools = await this.prisma.tool.findMany({
        where: { id: { in: toolIds } },
      });
      if (validTools.length !== toolIds.length) {
        throw new BadRequestException('One or more tool IDs are invalid.');
      }

      const validLevels = await this.prisma.level.findMany({
        where: { id: { in: levelIds } },
      });
      if (validLevels.length !== levelIds.length) {
        throw new BadRequestException('One or more level IDs are invalid.');
      }

      // Calculate total price
      // let totalPrice = 0;
      // for (const product of orderProducts) {
      //   const price =
      //     product.timeUnit === 'HOURLY'
      //       ? product.workingTime * (product.professionId ? validProfessions.find(p => p.id === product.professionId)?.priceHourly : validTools.find(t => t.id === product.toolId)?.price)
      //       : product.workingTime * (product.professionId ? validProfessions.find(p => p.id === product.professionId)?.priceDaily : validTools.find(t => t.id === product.toolId)?.price);
      //   totalPrice += price * product.quantity;
      // }

      // Create Order record
      const order = await this.prisma.order.create({
        data: {
          ...body,
          ownerId: userId,
        },
      });

      // Create related OrderProduct records
      const orderProductData = orderProducts.map(product => ({
        orderId: order.id,
        professionId: product.professionId,
        toolId: product.toolId,
        levelId: product.levelId,
        quantity: product.quantity,
        timeUnit: product.timeUnit,
        workingTime: product.workingTime,
        price: product.price

      }));
      await this.prisma.orderProduct.createMany({ data: orderProductData });


      return { data: order };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(userId?: string, userRole?: string, params: any = {}) {
    try {
      const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', status } = params;

      const where: any = {};
      if ((userRole === Role.ADMIN || userRole === Role.SUPER_ADMIN) && userId) {
        where.ownerId = userId;
      }
      if (search) {
        where.OR = [
          { address: { contains: search, mode: 'insensitive' } },
          { deliveryComment: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (status) {
        where.status = status;
      }

      const [data, total] = await this.prisma.$transaction([
        this.prisma.order.findMany({
          where,
          include: {
            owner: {
              select: {
                id: true,
                fullname: true,
                phone: true,

              }
            },
            orderProducts: true,
            masters: { include: { master: true } },
          },
          orderBy: { [sortBy]: sortOrder },
          skip: (page - 1) * limit,
          take: +limit,
        }),
        this.prisma.order.count({ where }),
      ]);

      return {
        total,
        currentPage: +page,
        totalPages: Math.ceil(total / +limit),
        data,
      };
    } catch (error) {

      this.handleError(error);
    }
  }
  async findOne(id: string, userId?: string, userRole?: string) {
    try {
      const where: any = { id };
      if ((userRole === Role.USER_FIZ || userRole === Role.USER_YUR) && userId) {
        where.ownerId = userId;
      }

      const order = await this.prisma.order.findUnique({
        where,
        include: {
          owner: {
            select: {
              id: true,
              fullname: true,
              phone: true,

            }
          },
          orderProducts: true,
          masters: { include: { master: true } },
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found.');
      }

      return order;
    } catch (error) {
      this.handleError(error);
    }
  }


  async update(id: string, dto: UpdateOrderDto, userId: string, userRole: string) {
    try {
      const existing = await this.prisma.order.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Order not found.');
      }

      const { masterIds, status, ...body } = dto;

      // Assign masters if provided (only ADMIN/SUPERADMIN)
      if (masterIds?.length) {
        const validMasters = await this.prisma.master.findMany({
          where: { id: { in: masterIds } },
        });
        if (validMasters.length !== masterIds.length) {
          throw new BadRequestException('One or more master IDs are invalid.');
        }

        await this.prisma.orderMaster.deleteMany({ where: { orderId: id } });
        const orderMasterData = masterIds.map(masterId => ({
          orderId: id,
          masterid: masterId,
        }));
        await this.prisma.orderMaster.createMany({ data: orderMasterData });
      }

      // Update the order
      const updated = await this.prisma.order.update({
        where: { id },
        data: body,
      });

      return { message: 'Order updated successfully', data: updated };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string, isAdmin = false) {
    try {
      const existing = await this.prisma.order.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Order not found.');
      }

      await this.prisma.order.delete({ where: { id } });
      return { message: 'Order deleted successfully' };
    } catch (error) {
      this.handleError(error);
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