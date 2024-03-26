import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/images.entity';
import { ImagesRepository } from 'src/repositories/image.repository';
import { ApiResponse } from 'src/utils/response.util';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Images)
    public roleRepo: ImagesRepository,
  ) {}
  findOne(id: number) {
    return this.roleRepo.findOneBy({ id: id });
  }
  async remove(id: number) {
    const res = await this.roleRepo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return ApiResponse.success(null, 200, 'Image Deleted');
  }
}
