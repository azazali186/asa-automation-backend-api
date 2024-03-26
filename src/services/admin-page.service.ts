import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminPageDto } from 'src/dto/admin-page/create-admin-page.dto';
import { SearchAdminPageDto } from 'src/dto/admin-page/search-admin-page.dto';
import { UpdateAdminPageDto } from 'src/dto/admin-page/update-admin-page.dto';
import { AdminPageRepository } from 'src/repositories/admin-page.repository';
import { ApiResponse } from 'src/utils/response.util';

@Injectable()
export class AdminPageService {
  constructor(
    @InjectRepository(AdminPageRepository)
    public apRepo: AdminPageRepository,
  ) {}

  create(req: CreateAdminPageDto, user: any) {
    return this.apRepo.createAdminPage(req, user);
  }
  async findAll(name: SearchAdminPageDto) {
    return this.apRepo.findAdminPages(name);
  }
  findOne(id: number) {
    return this.apRepo.getAdminPageId(id);
  }
  update(id: any, req: UpdateAdminPageDto) {
    return this.apRepo.updateAdminPage(id, req);
  }
  async remove(id: number) {
    const res = await this.apRepo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`AdminPage with ID ${id} not found`);
    }
    return ApiResponse.success(null, 200, 'AdminPage Deleted');
  }
}
