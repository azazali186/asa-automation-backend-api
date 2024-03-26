import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from 'src/services/image.service';

@ApiTags('Image Management')
@ApiBearerAuth()
@Controller('images')
export class ImageController {
  constructor(private readonly roleService: ImageService) {}
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
