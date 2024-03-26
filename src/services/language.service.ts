import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLanguageDto } from 'src/dto/language/create-language.dto';
import { SearchLanguageDto } from 'src/dto/language/search-language.dto';
import { UpdateLanguageDto } from 'src/dto/language/update-language.dto';
import { LanguageRepository } from 'src/repositories/language.repository';
import { ApiResponse } from 'src/utils/response.util';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageRepository)
    public langRepo: LanguageRepository,
  ) {}

  create(req: CreateLanguageDto) {
    return this.langRepo.createLanguage(req);
  }
  async findAll(name: SearchLanguageDto) {
    return this.langRepo.findLanguages(name);
  }
  findOne(id: number) {
    return this.langRepo.getLanguageId(id);
  }
  update(id: any, req: UpdateLanguageDto) {
    return this.langRepo.updateLanguage(id, req);
  }
  async remove(id: number) {
    const res = await this.langRepo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return ApiResponse.success(null, 200, 'Language Deleted');
  }
}
