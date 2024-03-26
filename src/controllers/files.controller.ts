import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  Request,
  Body,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/services/files.service';
import { ApiTags, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from 'src/dto/images/upload-file.dto';
import { multerConfig } from 'src/config/multer.config';
import { DeleteFilesDto } from 'src/dto/images/delete-file.dto';

@ApiTags('Files Management')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async uploadFile(@UploadedFile() files: Express.Multer.File[], @Request() r) {
    return await this.filesService.uploadFile(r.files, r.user);
  }

  @Post('withId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async uploadFileWithId(
    @UploadedFile() files: Express.Multer.File[],
    @Request() r,
  ) {
    return await this.filesService.uploadFileWithId(r.files, r.user);
  }

  @Get()
  async getAllFiles() {
    return await this.filesService.getAllFiles();
  }

  @Get(':id')
  async getFileById(@Param('id') id: number, @Res() res) {
    const file = await this.filesService.getFileById(id);
    res.sendFile(file.file_name, { root: 'uploads' });
  }

  @Delete()
  @ApiBody({ type: DeleteFilesDto })
  async deleteFiles(@Body() body: { ids: number[] }) {
    return await this.filesService.deleteFiles(body.ids);
  }
}
