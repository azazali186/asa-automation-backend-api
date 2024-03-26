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
import { CreateCatalogDto } from 'src/dto/catalog/create-catalog.dto';
import { SearchCatalogDto } from 'src/dto/catalog/search-catalog.dto';
import { UpdateCatalogDto } from 'src/dto/catalog/update-catalog.dto';
import { CreateFeaturesDto } from 'src/dto/product/create-features.dto';
import { UpdateFeaturesDto } from 'src/dto/product/update-features.dto';
import { CatalogService } from 'src/services/catalog.service';

@ApiTags('Catalog Management')
@ApiBearerAuth()
@Controller('catalogs')
export class CatalogController {
  constructor(private readonly cpService: CatalogService) {}
  @Post()
  create(@Body(ValidationPipe) req: CreateCatalogDto, @Request() r) {
    return this.cpService.create(req, r.user);
  }
  @Get()
  findAll(@Query() req: SearchCatalogDto) {
    return this.cpService.findAll(req);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cpService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) req: UpdateCatalogDto,
    @Request() r,
  ) {
    return this.cpService.update(id, req, r.user);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cpService.remove(id);
  }

  @Patch('seo-create/:id')
  createSeo(
    @Param('id') id: number,
    @Body(ValidationPipe) req: CreateFeaturesDto[],
    @Request() r,
  ) {
    return this.cpService.createSeo(id, req, r.user);
  }

  @Patch('image-upload/:id')
  imageUpload(
    @Param('id') id: number,
    @Body(ValidationPipe) req: CreateFeaturesDto[],
    @Request() r,
  ) {
    return this.cpService.createSeo(id, req, r.user);
  }

  @Patch('image-remove/:id')
  imageDelete(
    @Param('id') id: number,
    @Body(ValidationPipe) req: CreateFeaturesDto[],
    @Request() r,
  ) {
    return this.cpService.createSeo(id, req, r.user);
  }

  @Patch('seo-update/:id')
  updateSeo(
    @Param('id') id: number,
    @Body(ValidationPipe) req: UpdateFeaturesDto[],
    @Request() r,
  ) {
    return this.cpService.updateSeo(id, req, r.user);
  }
}
