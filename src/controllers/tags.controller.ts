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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from 'src/dto/tag/create-tag.dto';
import { SearchTagDto } from 'src/dto/tag/search-tag.dto';
import { UpdateTagDto } from 'src/dto/tag/update-tag.dto';
import { TagService } from 'src/services/tag.setvice';

@ApiTags('Tag Management')
@ApiBearerAuth()
@Controller('tags')
export class TagController {
  constructor(private readonly langService: TagService) {}

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: UpdateTagDto) {
    // console.log('lang controller called');
    return this.langService.update(id, req);
  }

  @Post()
  create(@Body(ValidationPipe) req: CreateTagDto) {
    return this.langService.create(req);
  }
  @Get()
  findAll(@Query() req: SearchTagDto) {
    return this.langService.findAll(req);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.langService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.langService.remove(id);
  }
}
