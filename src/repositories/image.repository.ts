import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/images.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from './category.repository';
import { StockRepository } from './stock.repository';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { UpdateImagesDto } from 'src/dto/images/update-image.dto';
import { CatalogRepository } from './catalog.repository';

export class ImagesRepository extends Repository<Images> {
  constructor(
    @InjectRepository(Images)
    private imgRepo: Repository<Images>,
    @Inject(forwardRef(() => CategoryRepository))
    private catRepo: CategoryRepository,

    @Inject(forwardRef(() => StockRepository))
    private stRepo: StockRepository,

    @Inject(forwardRef(() => ProductRepository))
    private prodRepo: ProductRepository,

    @Inject(forwardRef(() => CatalogRepository))
    private cpRepo: CatalogRepository,
  ) {
    super(imgRepo.target, imgRepo.manager, imgRepo.queryRunner);
  }

  async createImage(url: string, type: string, id: number) {
    // const { url } = imageDto;
    const image = new Images();
    image.url = url;

    switch (type) {
      case 'category':
        const category = await this.catRepo.findOne({
          where: { id: id },
        });
        image.categories = category;
        break;

      case 'product':
        const product = await this.prodRepo.findOne({
          where: { id: id },
        });
        image.products = product;
        break;

      case 'stock':
        const stock = await this.stRepo.findOne({ where: { id: id } });
        image.stocks = stock;
        break;

      case 'catalog':
        const catalog = await this.cpRepo.findOne({ where: { id: id } });
        image.catalogs = catalog;
        break;
    }

    await this.imgRepo.save(image);

    return image;
  }

  async updateImage(imageDto: UpdateImagesDto) {
    const { url, category_id, product_id, stock_id, catalog_id } = imageDto;
    const image = await this.imgRepo.findOne({ where: { id: imageDto.id } });
    if (!image) {
      throw new NotFoundException({
        statusCode: 404,
        message: `NOT_FOUND`,
        param: `Image`,
      });
    }

    image.url = url;

    if (category_id) {
      const cat = await this.catRepo.findOne({ where: { id: category_id } });
      image.categories = cat;
    }

    if (product_id) {
      const prod = await this.prodRepo.findOne({ where: { id: product_id } });
      image.products = prod;
    }

    if (stock_id) {
      const st = await this.stRepo.findOne({ where: { id: stock_id } });
      image.stocks = st;
    }

    if (catalog_id) {
      const cp = await this.cpRepo.findOne({ where: { id: catalog_id } });
      image.catalogs = cp;
    }

    await this.imgRepo.save(image);

    return image;
  }
}
