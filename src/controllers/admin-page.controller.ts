/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  Query,
  Patch,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAdminPageDto } from 'src/dto/admin-page/create-admin-page.dto';
import { SearchAdminPageDto } from 'src/dto/admin-page/search-admin-page.dto';
import { UpdateAdminPageDto } from 'src/dto/admin-page/update-admin-page.dto';
import { AdminPageService } from 'src/services/admin-page.service';

@ApiTags('AdminPage Management')
@ApiBearerAuth()
@Controller('admin-pages')
export class AdminPageController {
  constructor(private readonly apService: AdminPageService) {}
  @Post()
  create(@Body(ValidationPipe) req: CreateAdminPageDto, @Request() r) {
    return this.apService.create(req, r.user);
  }
  @Get()
  findAll(@Query() req: SearchAdminPageDto) {
    return this.apService.findAll(req);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.apService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) req: UpdateAdminPageDto,
  ) {
    return this.apService.update(id, req);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.apService.remove(id);
  }
}
