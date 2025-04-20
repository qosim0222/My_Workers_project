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
  ParseUUIDPipe,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role.decorator';
import { Role } from '@prisma/client';

@Controller('masters')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() dto: CreateMasterDto) {
    return this.masterService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN,Role.SUPER_ADMIN,Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all masters with filters' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of items per page' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term for name or phone' })
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
    return this.masterService.findAll({
      page: page ?? 1,
      limit: limit ?? 10,
      search,
      sortBy,
      sortOrder: sortOrder ?? 'asc',
      isActive,
    });
  }

  @Get(':id')
  @Roles(Role.ADMIN,Role.SUPER_ADMIN,Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.masterService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMasterDto,
  ) {
    return this.masterService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.masterService.remove(id);
  }
}