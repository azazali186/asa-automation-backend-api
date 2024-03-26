/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminPageDto } from 'src/dto/admin-page/create-admin-page.dto';
import { SearchAdminPageDto } from 'src/dto/admin-page/search-admin-page.dto';
import { UpdateAdminPageDto } from 'src/dto/admin-page/update-admin-page.dto';
import { AdminPage } from 'src/entities/admin-page.entity';
import { Repository } from 'typeorm';
import { PermissionRepository } from './permission.repository';
import { Inject, forwardRef } from '@nestjs/common';
import { ApiResponse } from 'src/utils/response.util';

export class AdminPageRepository extends Repository<AdminPage> {
  constructor(
    @InjectRepository(AdminPage)
    private apRepo: Repository<AdminPage>,

    @Inject(forwardRef(() => PermissionRepository))
    private paramRepo: PermissionRepository,
  ) {
    super(apRepo.target, apRepo.manager, apRepo.queryRunner);
  }

  findAdminPages(name: SearchAdminPageDto) {
    const adminPages = this.find({
      select: {
        id: true,
        name: true,
        route_name: true,
      },
    });
    return ApiResponse.success(adminPages, 200, 'fetched Successfully');
  }
  getAdminPageId(id: number) {
    const adminPages = this.findOne({
      where: {
        id: id,
      },
      relations: {
        children: true,
        parent: true,
      },
    });
    return ApiResponse.success(adminPages, 200, 'fetched Successfully');
  }
  updateAdminPage(id: any, req: UpdateAdminPageDto) {
    throw new Error('Method not implemented.');
  }
  createAdminPage(req: CreateAdminPageDto, user: any) {
    throw new Error('Method not implemented.');
  }
}
