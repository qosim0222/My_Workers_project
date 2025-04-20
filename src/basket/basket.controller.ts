import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Roles } from 'src/guards/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Basket')
@ApiBearerAuth()
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER_FIZ,)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() dto: CreateBasketDto, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.basketService.create(dto, userId, userRole);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.basketService.findAll(userId, userRole);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.basketService.findOne(id, userId, userRole);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER_FIZ,Role.SUPER_ADMIN,Role.USER_YUR,)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateBasketDto, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.basketService.update(id, dto, userId, userRole);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER_FIZ,Role.USER_YUR,)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.basketService.remove(id, userId, userRole);
  }
}