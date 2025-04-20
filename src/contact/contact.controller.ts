import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/guards/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  @Roles(Role.USER_FIZ, Role.USER_YUR, Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() dto: CreateContactDto) {
    const userId = req.user.id;
    return this.contactService.create(dto, userId);
  }

  @Get()
 
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  findAll(@Query() query: any) {
    return this.contactService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.USER_FIZ, Role.USER_YUR, Role.ADMIN,Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.contactService.findOne(id, userId, userRole);
  }

  @Patch(':id')
  @Roles(Role.USER_FIZ, Role.USER_YUR, Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.USER_FIZ, Role.USER_YUR, Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
