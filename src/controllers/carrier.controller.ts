import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCarrierDto } from 'src/dto/carrier/create-carrier.dto';
import { SearchCarrierDto } from 'src/dto/carrier/search-carrier.dto';
import { UpdateCarrierDto } from 'src/dto/carrier/update-carrier.dto';
import { CarrierService } from 'src/services/carrier.service';

@ApiTags('Carrier Management')
@ApiBearerAuth()
@Controller('carrier')
export class CarrierController {
  constructor(private readonly currService: CarrierService) {}
  @Post()
  create(@Body(ValidationPipe) req: CreateCarrierDto) {
    return this.currService.create(req);
  }
  @Get()
  findAll(@Query() req: SearchCarrierDto) {
    return this.currService.findAll(req);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.currService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body(ValidationPipe) req: UpdateCarrierDto) {
    return this.currService.update(id, req);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.currService.remove(id);
  }
}
