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
import { CreateLanguageDto } from 'src/dto/language/create-language.dto';
import { SearchLanguageDto } from 'src/dto/language/search-language.dto';
import { UpdateLanguageDto } from 'src/dto/language/update-language.dto';
import { LanguageService } from 'src/services/language.service';

@ApiTags('Language Management')
@ApiBearerAuth()
@Controller('languages')
export class LanguageController {
  constructor(private readonly langService: LanguageService) {}

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: UpdateLanguageDto) {
    // console.log('lang controller called');
    return this.langService.update(id, req);
  }

  @Post()
  create(@Body(ValidationPipe) req: CreateLanguageDto) {
    return this.langService.create(req);
  }
  @Get()
  findAll(@Query() req: SearchLanguageDto) {
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
