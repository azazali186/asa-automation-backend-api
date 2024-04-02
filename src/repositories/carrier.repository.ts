import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarrierDto } from 'src/dto/carrier/create-carrier.dto';
import { SearchCarrierDto } from 'src/dto/carrier/search-carrier.dto';
import { UpdateCarrierDto } from 'src/dto/carrier/update-carrier.dto';
import { Carrier } from 'src/entities/carrier.entity';
import { LangService } from 'src/services/lang.service';
import { ApiResponse } from 'src/utils/response.util';
import { Like, Repository } from 'typeorm';

export class CarrierRepository extends Repository<Carrier> {
  constructor(
    @InjectRepository(Carrier)
    private curRepo: Repository<Carrier>,
    private langService: LangService,
  ) {
    super(curRepo.target, curRepo.manager, curRepo.queryRunner);
  }

  async createCarrier(req: CreateCarrierDto) {
    const { code, location, name, type, supported_incoterms, website } = req;
    const carrier = new Carrier();
    carrier.code = code;
    carrier.location = location;
    carrier.name = name;
    carrier.type = type;
    carrier.supported_incoterms = supported_incoterms;
    carrier.website = website;
    carrier.created_at = new Date();
    carrier.created_by = req.user;
    carrier.status = true;
    return ApiResponse.create(
      this.curRepo.save(carrier),
      201,
      this.langService.getTranslation('CREATED_SUCCESSFULLY', 'Carrier'),
      null,
    );
  }

  getCarrierId(id: number) {
    const data = this.findOne({ where: { id: id } });
    return ApiResponse.create(
      data,
      200,
      this.langService.getTranslation('GET_DATA_SUCCESS', 'Carrier'),
      null,
    );
  }

  async findCurrencies(req: SearchCarrierDto) {
    const { name, type, code, supported_incoterms } = req;
    const options = {
      where: {},
    };
    if (name) {
      options.where['name'] = Like('%' + name + '%');
    }
    if (type) {
      options.where['type'] = type;
    }

    if (supported_incoterms) {
      options.where['supported_incoterms'] = supported_incoterms;
    }

    if (code) {
      options.where['code'] = Like('%' + code + '%');
    }

    const [list, count] = await this.curRepo.findAndCount({
      where: options.where,
      skip: req.offset,
      take: req.limit,
    });

    return ApiResponse.paginate({ list, count });
  }

  async updateCarrier(id: any, req: UpdateCarrierDto) {
    const curUpdate = await this.curRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!curUpdate) {
      throw new NotFoundException({
        statusCode: 404,
        message: `INVALID_ID`,
        param: `${id}`,
      });
    }
    const { name, location, code, type, supported_incoterms, website, status } =
      req;
    if (name) {
      curUpdate.name = name;
    }
    if (location) {
      curUpdate.location = location;
    }

    if (code) {
      curUpdate.code = code;
    }

    if (type) {
      curUpdate.type = type;
    }
    if (supported_incoterms) {
      curUpdate.supported_incoterms = supported_incoterms;
    }
    if (website) {
      curUpdate.website = website;
    }

    if (status === undefined) {
      curUpdate.status = status;
    }

    curUpdate.updated_at = new Date();
    curUpdate.updated_by = req.user;

    return ApiResponse.create(this.save(curUpdate));
  }
}
