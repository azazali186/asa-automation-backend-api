import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { Files } from 'src/entities/files.entity';
import { UserRepository } from './user.repository';
import { ApiResponse } from 'src/utils/response.util';
import { extname, join } from 'path';

import * as fs from 'fs';
import { getMediaTypeFromMimetype } from 'src/utils/helper.utils';

export class FilesRepository extends Repository<Files> {
  constructor(
    @InjectRepository(Files)
    private fRepo: Repository<Files>,

    @Inject(forwardRef(() => UserRepository))
    private userRepo: UserRepository,
  ) {
    super(fRepo.target, fRepo.manager, fRepo.queryRunner);
  }

  async uploadFile(files: Express.Multer.File[], user: any) {
    // user.roles.permissions = [];
    const uploadedFiles: string[] = [];

    for (const file of files) {
      const newFile = new Files();
      newFile.url = file.path;
      newFile.file_name = file.filename;
      newFile.media_type = getMediaTypeFromMimetype(file.mimetype);
      newFile.extention = extname(file.originalname);
      newFile.size = file.size.toString();
      newFile.original_file_name = file.originalname;

      await this.fRepo.save(newFile);
      uploadedFiles.push(this.getFileUrl(newFile.url));
    }
    const data = {
      urls: uploadedFiles,
    };
    return ApiResponse.success(data, 200);
  }

  private getFileUrl(filename: string): string {
    // Construct the complete URL based on your server configuration
    const serverBaseUrl =
      process.env.NODE_ENV === 'prod'
        ? process.env.SWAGGER_DEV_SERVER
        : process.env.SWAGGER_SERVER;
    return `${serverBaseUrl}/${filename}`;
  }

  async uploadFileWithId(files: Express.Multer.File[], user: any) {
    // user.roles.permissions = [];
    const uploadedFiles: any[] = [];

    for (const file of files) {
      const newFile = new Files();
      newFile.url = file.path;
      newFile.full_url = this.getFileUrl(file.path);
      newFile.file_name = file.filename;
      newFile.media_type = getMediaTypeFromMimetype(file.mimetype);
      newFile.extention = extname(file.originalname);
      newFile.size = file.size.toString();
      newFile.original_file_name = file.originalname;

      await this.fRepo.save(newFile);
      uploadedFiles.push({
        id: newFile.id,
        url: this.getFileUrl(newFile.url),
      });
    }
    const data = uploadedFiles;
    return ApiResponse.success(data, 200);
  }

  async removeMultiple(ids: number[]) {
    const filesToDelete = await this.fRepo.find({
      where: { id: In(ids) },
    });

    if (filesToDelete.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'No files found to delete',
      });
    }

    // Delete files from storage
    filesToDelete.forEach((file) => {
      const filePath = join(__dirname, '../..', 'uploads', file.file_name);
      fs.unlinkSync(filePath);
    });

    // Delete files from the database
    await this.fRepo.remove(filesToDelete);

    return ApiResponse.success(null, 200, 'DATA DELETED');
  }
}
