// files.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from 'src/entities/files.entity';
import { FilesRepository } from 'src/repositories/files.repository';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository)
    private readonly filesRepository: FilesRepository,
  ) {}

  async uploadFile(files: Express.Multer.File[], user: any) {
    return this.filesRepository.uploadFile(files, user);
  }

  async uploadFileWithId(files: Express.Multer.File[], user: any) {
    return this.filesRepository.uploadFileWithId(files, user);
  }

  async getAllFiles(): Promise<Files[]> {
    return await this.filesRepository.find();
  }

  async getFileById(id: number) {
    const file = await this.filesRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async deleteFiles(ids: number[]) {
    return this.filesRepository.removeMultiple(ids);
  }
}
