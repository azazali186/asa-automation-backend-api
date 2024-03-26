import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCurrencyDto } from 'src/dto/currency/create-currency.dto';
import { SearchCurrencyDto } from 'src/dto/currency/search-currency.dto';
import { UpdateCurrencyDto } from 'src/dto/currency/update-currency.dto';
import { CurrencyRepository } from 'src/repositories/currency.repository';
import { ApiResponse } from 'src/utils/response.util';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyRepository)
    public curRepo: CurrencyRepository,
  ) {}

  create(req: CreateCurrencyDto) {
    return this.curRepo.createCurrency(req);
  }
  async findAll(name: SearchCurrencyDto) {
    return this.curRepo.findCurrencies(name);
  }
  findOne(id: number) {
    return this.curRepo.getCurrencyId(id);
  }
  update(id: any, req: UpdateCurrencyDto) {
    return this.curRepo.updateCurrency(id, req);
  }
  async remove(id: number) {
    const res = await this.curRepo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
    return ApiResponse.success(null, 200, 'Currency Deleted');
  }
}
