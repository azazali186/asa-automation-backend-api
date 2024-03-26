import { InjectRepository } from '@nestjs/typeorm';
import { CreateTranslationDto } from 'src/dto/translation/create-translation.dto';
import { Translations } from 'src/entities/translation.entity';
import { Repository } from 'typeorm';
import { LanguageRepository } from './language.repository';
import { CategoryRepository } from './category.repository';
import { ProductRepository } from './product.repository';
import { StockRepository } from './stock.repository';
import { UpdateTranslationDto } from 'src/dto/translation/update-translation.dto';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { Variation } from 'src/entities/variations.entity';
import { getEntityByCode, getEntityById } from 'src/utils/helper.utils';
import { CatalogRepository } from './catalog.repository';
import { ProductFeatureRepository } from './product-features.repository';

export class TranslationsRepository extends Repository<Translations> {
  constructor(
    @InjectRepository(Translations)
    private transRepo: Repository<Translations>,

    @Inject(forwardRef(() => CategoryRepository))
    private catRepo: CategoryRepository,

    @Inject(forwardRef(() => StockRepository))
    private stRepo: StockRepository,

    @Inject(forwardRef(() => ProductRepository))
    private prodRepo: ProductRepository,

    @Inject(forwardRef(() => LanguageRepository))
    private langRepo: LanguageRepository,

    @Inject(forwardRef(() => CatalogRepository))
    private cpRepo: CatalogRepository,

    @Inject(forwardRef(() => ProductFeatureRepository))
    private pfRepo: ProductFeatureRepository,
  ) {
    super(transRepo.target, transRepo.manager, transRepo.queryRunner);
  }

  async createTranslation(
    {
      name,
      language_code,
      description,
      meta_title,
      meta_keywords,
      meta_descriptions,
    }: CreateTranslationDto | UpdateTranslationDto,
    type: string,
    id: number,
    variation: Variation[] = null,
  ) {
    const translation = new Translations();

    if (variation) {
      const variationText = variation
        .map((item) => {
          return item.name + ' ' + item.value;
        })
        .join(' ');
      name && (name += ` ${variationText}`);
      description && (description += ` ${variationText}`);
      meta_title && (meta_title += ` ${variationText}`);
      meta_keywords && (meta_keywords += ` ${variationText}`);
      meta_descriptions && (meta_descriptions += ` ${variationText}`);
    }

    translation.name = name;
    translation.description = description;
    translation.meta_title = meta_title;
    translation.meta_keywords = meta_keywords;
    translation.meta_descriptions = meta_descriptions;

    if (language_code) {
      try {
        const lang = await getEntityByCode(this.langRepo, language_code);
        translation.language = lang;
      } catch (error) {
        throw new NotFoundException(
          `Language with code ${language_code} not found.`,
        );
      }
    }

    switch (type) {
      case 'product':
        translation.products = await getEntityById(this.prodRepo, id);
        break;

      case 'category':
        translation.categories = await getEntityById(this.catRepo, id);
        break;

      case 'stocks':
        translation.stock = await getEntityById(this.stRepo, id);
        break;
      case 'catalog':
        translation.catalogs = await getEntityById(this.cpRepo, id);
        break;
      case 'feature':
        translation.product_feature = await getEntityById(this.pfRepo, id);
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }

    await this.transRepo.save(translation);

    return translation;
  }

  async updateTranslation(translationDto: UpdateTranslationDto) {
    const {
      id,
      name,
      language_code,
      description,
      meta_title,
      meta_keywords,
      meta_descriptions,
    } = translationDto;
    try {
      const translation = await getEntityById(this.transRepo, id);

      if (language_code) {
        try {
          const lang = await getEntityByCode(this.langRepo, language_code);
          translation.language = lang;
        } catch (error) {
          throw new NotFoundException(
            `Language with code ${language_code} not found.`,
          );
        }
      }

      translation.name = name || translation.name;
      translation.description = description || translation.description;
      translation.meta_title = meta_title || translation.meta_title;
      translation.meta_keywords = meta_keywords || translation.meta_keywords;
      translation.meta_descriptions =
        meta_descriptions || translation.meta_descriptions;

      await this.transRepo.save(translation);

      return translation;
    } catch (error) {
      throw new NotFoundException(`Translation with ID ${id} not found.`);
    }
  }
}
