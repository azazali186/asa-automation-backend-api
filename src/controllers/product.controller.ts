import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSeo } from 'src/dto/create-seo.dto';
import { BulkProductUploadDto } from 'src/dto/product/bulk-product-upload.dto';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { SearchProductDto } from 'src/dto/product/search-product.dto';
import { UpdateProductDto } from 'src/dto/product/update-product.dto';
import { ProductService } from 'src/services/product.service';
import { RecomService } from 'src/services/recom.service';

@ApiTags('Product Management')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(
    private readonly prodService: ProductService,
    private readonly recomService: RecomService,
  ) {}
  @Post()
  create(@Body() req: CreateProductDto, @Request() r) {
    return this.prodService.create(req, r.user);
  }

  @Post('bulk')
  bulk(@Body() req: BulkProductUploadDto, @Request() r) {
    return this.prodService.bulk(req, r.user);
  }

  @Get()
  findAll(@Query() req: SearchProductDto, @Request() r) {
    return this.prodService.findAll(req, r.user);
  }

  @Get('details/:slug')
  findDetails(@Param('slug') slug: string, @Request() r) {
    return this.prodService.findDetails(slug, r.user);
  }

  @Get('sku/:sku')
  findSku(@Param('sku') sku: string) {
    return this.prodService.findSku(sku);
  }

  @Get('slug/:slug')
  findSlug(@Param('slug') slug: string) {
    return this.prodService.findSlug(slug);
  }

  @Get('public/landing-page')
  getPopularProductsOfCurrentMonth(@Request() r) {
    return this.recomService.getLandingPageData(r.user);
  }

  @Get('public/landing-page/shop/:slug')
  getPopularProductsOfShop(@Param('slug') slug: string, @Request() r) {
    return this.recomService.getLandingPageDataShop(r.user, slug);
  }

  @Get('public')
  public(@Query() req: SearchProductDto, @Request() r) {
    // console.log(req.user);
    return this.prodService.findAll(req, r.user);
  }

  @Get('public/:id')
  findPublic(@Param('id') id: number, @Request() r) {
    return this.prodService.findOne(id, r.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Request() r) {
    return this.prodService.findOne(id, r.user);
  }

  @Patch('seo/:id')
  createSeo(@Param('id') id: number, @Body() req: CreateSeo, @Request() r) {
    return this.prodService.createSeo(id, req, r.user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: UpdateProductDto, @Request() r) {
    return this.prodService.update(id, req, r.user);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prodService.remove(id);
  }
}
