import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarrierDto } from 'src/dto/carrier/create-carrier.dto';
import { SearchCarrierDto } from 'src/dto/carrier/search-carrier.dto';
import { UpdateCarrierDto } from 'src/dto/carrier/update-carrier.dto';
import { CarrierRepository } from 'src/repositories/carrier.repository';
import { ApiResponse } from 'src/utils/response.util';

@Injectable()
export class CarrierService {
  constructor(
    @InjectRepository(CarrierRepository)
    public curRepo: CarrierRepository,
  ) {}

  create(req: CreateCarrierDto) {
    return this.curRepo.createCarrier(req);
  }
  async findAll(name: SearchCarrierDto) {
    return this.curRepo.findCurrencies(name);
  }
  findOne(id: number) {
    return this.curRepo.getCarrierId(id);
  }
  update(id: any, req: UpdateCarrierDto) {
    return this.curRepo.updateCarrier(id, req);
  }
  async remove(id: number) {
    const res = await this.curRepo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Carrier with ID ${id} not found`);
    }
    return ApiResponse.success(null, 200, 'Carrier Deleted');
  }
}
