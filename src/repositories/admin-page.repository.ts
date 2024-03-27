/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminPageDto } from 'src/dto/admin-page/create-admin-page.dto';
import { SearchAdminPageDto } from 'src/dto/admin-page/search-admin-page.dto';
import { UpdateAdminPageDto } from 'src/dto/admin-page/update-admin-page.dto';
import { AdminPage } from 'src/entities/admin-page.entity';
import { In, Repository } from 'typeorm';
import { PermissionRepository } from './permission.repository';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { ApiResponse } from 'src/utils/response.util';
import { LangService } from 'src/services/lang.service';

export class AdminPageRepository extends Repository<AdminPage> {
  constructor(
    @InjectRepository(AdminPage)
    private apRepo: Repository<AdminPage>,

    @Inject(forwardRef(() => PermissionRepository))
    private paramRepo: PermissionRepository,

    private langService: LangService,
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
  async updateAdminPage(id: any, req: UpdateAdminPageDto) {
    const {
      name,
      description,
      url,
      icon,
      permissionIds,
      parentId,
      childrenIds,
      route_name,
    } = req;

    const ap = await this.apRepo.findOne({ where: { id: id } });

    if (!ap) {
      throw new NotFoundException(
        this.langService.getErrorTranslation('INVALID_ID', 'Admin Page id'),
      );
    }

    if (icon) ap.icon = icon;
    if (url) ap.url = url;

    if (route_name) ap.route_name = route_name;

    if (name) ap.name = name;

    if (description) ap.description = description;

    if (parentId) {
      const parent = await this.apRepo.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          this.langService.getErrorTranslation('INVALID_ID', 'ParentId'),
        );
      }
      ap.parent = parent;
    } else {
      ap.parent = null;
    }

    if (childrenIds && childrenIds.length > 0) {
      const childrens = await this.apRepo.find({
        where: { id: In(childrenIds) },
      });
      ap.children = childrens;
    } else {
      ap.children = [];
    }

    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.paramRepo.find({
        where: { id: In(permissionIds) },
      });
      ap.permissions = permissions;
    } else {
      ap.permissions = [];
    }

    await ap.save();

    return ApiResponse.create(
      null,
      200,
      this.langService.getTranslation('UPDATED_SUCCESSFULLY', 'Admin Pages'),
      null,
    );
  }
  async createAdminPage(req: CreateAdminPageDto, user: any) {
    const {
      name,
      description,
      url,
      icon,
      permissionIds,
      parentId,
      childrenIds,
      route_name,
    } = req;

    const ap = new AdminPage();
    ap.icon = icon;
    ap.url = url;
    ap.icon = icon;
    ap.route_name = route_name;
    ap.name = name;
    ap.description = description;
    if (parentId) {
      const parent = await this.apRepo.findOne({
        where: { id: parentId },
      });
      ap.parent = parent;
    }
    if (childrenIds && childrenIds.length > 0) {
      const childrens = await this.apRepo.find({
        where: { id: In(childrenIds) },
      });
      ap.children = childrens;
    }
    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.paramRepo.find({
        where: { id: In(permissionIds) },
      });
      ap.permissions = permissions;
    }

    await ap.save();

    return ApiResponse.create(
      null,
      201,
      this.langService.getTranslation('CREATED_SUCCESSFULLY', 'Admin Pages'),
      null,
    );
  }
}
