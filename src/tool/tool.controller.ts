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
  Req,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/guards/role.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';


@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolService.create(createToolDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, })
  @ApiQuery({ name: 'sortBy', required: false, example: 'price' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'asc' })
  findAll(@Query() query) {
    return this.toolService.findAll(query);
  }

  @Get(':id')
 
  @Roles(Role.ADMIN, Role.SUPER_ADMIN,Role.VIEWER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.toolService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolService.update(id, updateToolDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.toolService.remove(id);
  }
}
