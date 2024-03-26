import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/dto/search/search.dto';
import { SearchService } from 'src/services/search.service';

@ApiTags('Search Management')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('product/:product')
  searchProducts(@Param('product') product: string) {
    return this.searchService.searchProducts(product);
  }
  @Get('category/:category')
  searchCategory(@Param('category') category: string) {
    return this.searchService.searchCategory(category);
  }
  @Get('shop/:shop')
  searchShop(@Param('shop') shop: string) {
    return this.searchService.searchShop(shop);
  }
  @Get('')
  search(@Query() req: SearchDto) {
    return this.searchService.search(req);
  }
}
