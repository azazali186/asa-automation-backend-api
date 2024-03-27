import { InjectRepository } from '@nestjs/typeorm';
import { CreateTranslationDto } from 'src/dto/translation/create-translation.dto';
import { Translations } from 'src/entities/translation.entity';
import { Repository } from 'typeorm';
import { LanguageRepository } from './language.repository';
import { UpdateTranslationDto } from 'src/dto/translation/update-translation.dto';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { getEntityByCode, getEntityById } from 'src/utils/helper.utils';

export class TranslationsRepository extends Repository<Translations> {
  constructor(
    @InjectRepository(Translations)
    private transRepo: Repository<Translations>,

    @Inject(forwardRef(() => LanguageRepository))
    private langRepo: LanguageRepository,
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
  ) {
    const translation = new Translations();

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
