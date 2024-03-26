import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLanguageDto } from 'src/dto/language/create-language.dto';
import { SearchLanguageDto } from 'src/dto/language/search-language.dto';
import { UpdateLanguageDto } from 'src/dto/language/update-language.dto';
import { Language } from 'src/entities/language.entity';
import { LangService } from 'src/services/lang.service';
import { ApiResponse } from 'src/utils/response.util';
import { Like, Repository } from 'typeorm';

export class LanguageRepository extends Repository<Language> {
  constructor(
    @InjectRepository(Language)
    private langRepo: Repository<Language>,
    private langService: LangService,
  ) {
    super(langRepo.target, langRepo.manager, langRepo.queryRunner);
  }

  async createLanguage(req: CreateLanguageDto) {
    const { code, name } = req;
    const currency = new Language();
    currency.code = code;
    currency.name = name;
    return ApiResponse.create(
      this.langRepo.save(currency),
      201,
      this.langService.getTranslation('CREATED_SUCCESSFULLY', 'Language'),
      null,
    );
  }

  getLanguageId(id: number) {
    const data = this.findOne({ where: { id: id } });
    return ApiResponse.create(
      data,
      200,
      this.langService.getTranslation('GET_DATA_SUCCESS', 'Language'),
      null,
    );
  }

  async findLanguages(req: SearchLanguageDto) {
    const { name, code } = req;
    const options = {
      where: {},
    };
    if (name) {
      options.where['name'] = Like('%' + name + '%');
    }

    if (code) {
      options.where['name'] = Like('%' + code + '%');
    }

    const [list, count] = await this.findAndCount({ where: options.where });

    return ApiResponse.paginate({ list, count });
  }

  async updateLanguage(id: any, req: UpdateLanguageDto) {
    const curUpdate = await this.langRepo.findOne({
      where: {
        id: id,
      },
    });
    // console.log('Req', req);
    // console.log('id', id);
    if (!curUpdate) {
      throw new NotFoundException({
        statusCode: 404,
        message: `INVALID_ID`,
        param: `${id}`,
      });
    }
    const { name, code } = req;
    if (name) {
      curUpdate.name = name;
    }

    if (code) {
      curUpdate.code = code;
    }
    // console.log('Req', req);
    return ApiResponse.create(this.langRepo.save(curUpdate));
  }
}
