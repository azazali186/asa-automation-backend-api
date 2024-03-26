/* eslint-disable prettier/prettier */
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
import { BulkCreateCategoryDto } from 'src/dto/category/bulk-product-upload.dto';
import { CreateCategoryDto } from 'src/dto/category/create-category.dto';
import { SearchCategoryDto } from 'src/dto/category/search-category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto';
import { CreateFeaturesDto } from 'src/dto/product/create-features.dto';
import { UpdateFeaturesDto } from 'src/dto/product/update-features.dto';
import { CategoryService } from 'src/services/category.service';

@ApiTags('Category Management')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}
  @Post()
  create(@Body(ValidationPipe) req: CreateCategoryDto) {
    return this.catService.create(req);
  }

  @Post('bulk')
  bulk(@Body(ValidationPipe) req: BulkCreateCategoryDto) {
    return this.catService.bulk(req);
  }

  @Get('public')
  public(@Query() req: SearchCategoryDto, @Request() r) {
    return this.catService.findAll(req, r.user);
  }

  @Get()
  findAll(@Query() req: SearchCategoryDto, @Request() r) {
    return this.catService.findAll(req, r.user);
  }

  @Get('all')
  find() {
    return this.catService.findAllCat();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) req: UpdateCategoryDto,
  ) {
    return this.catService.update(id, req);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catService.remove(id);
  }

  @Patch('seo-create/:id')
  createSeo(
    @Param('id') id: number,
    @Body(ValidationPipe) req: CreateFeaturesDto[],
    @Request() r,
  ) {
    return this.catService.createSeo(id, req, r.user);
  }

  @Patch('image-upload/:id')
  imageUpload(
    @Param('id') id: number,
    @Body(ValidationPipe) req: CreateFeaturesDto[],
    @Request() r,
  ) {
    return this.catService.createSeo(id, req, r.user);
  }

  @Patch('image-remove/:id')
  imageDelete(
    @Param('id') id: number,
    @Body(ValidationPipe) req: CreateFeaturesDto[],
    @Request() r,
  ) {
    return this.catService.createSeo(id, req, r.user);
  }

  @Patch('seo-update/:id')
  updateSeo(
    @Param('id') id: number,
    @Body(ValidationPipe) req: UpdateFeaturesDto[],
    @Request() r,
  ) {
    return this.catService.updateSeo(id, req, r.user);
  }
}
