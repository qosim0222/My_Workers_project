import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { Role } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiBearerAuth()
@Controller('professions')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreateProfessionDto) {
    return this.professionService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all professions with filters' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of items per page' })
  @ApiQuery({ name: 'search', required:false, example: "Elektrik", description:"Search term for name fields" })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt', description: 'Field to sort by' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'asc', description: 'Sort order (asc or desc)' })
  @ApiQuery({ name: 'isActive', required: false, example: true, description: 'Filter by isActive' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('isActive') isActive?: boolean,
  ) {
    return this.professionService.findAll({
      page: page ?? 1,
      limit: limit ?? 10,
      search,
      sortBy,
      sortOrder: sortOrder ?? 'asc',
      isActive,
    });
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN,Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.professionService.findOne(id);
  }

  
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProfessionDto,
  ) {
    return this.professionService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.professionService.remove(id);
  }
}


