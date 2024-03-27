import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/images.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateImagesDto } from 'src/dto/images/update-image.dto';

export class ImagesRepository extends Repository<Images> {
  constructor(
    @InjectRepository(Images)
    private imgRepo: Repository<Images>,
  ) {
    super(imgRepo.target, imgRepo.manager, imgRepo.queryRunner);
  }

  async createImage(url: string) {
    // const { url } = imageDto;
    const image = new Images();
    image.url = url;

    await this.imgRepo.save(image);

    return image;
  }

  async updateImage(imageDto: UpdateImagesDto) {
    const { url } = imageDto;
    const image = await this.imgRepo.findOne({ where: { id: imageDto.id } });
    if (!image) {
      throw new NotFoundException({
        statusCode: 404,
        message: `NOT_FOUND`,
        param: `Image`,
      });
    }

    image.url = url;

    await this.imgRepo.save(image);

    return image;
  }
}
