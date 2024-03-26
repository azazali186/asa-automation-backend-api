import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  Request,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { SearchRoleDto } from 'src/dto/search-role.dto';
import { UpdateRoleDto } from 'src/dto/update-role.dto';
import { RoleService } from 'src/services/role.service';

@ApiTags('Roles Management')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
    
  @Patch(':id')
  update(@Param('id') id: number, @Body() req: UpdateRoleDto) {
    // console.log('lang controller called');
    return this.roleService.update(id, req);
  }

  @Post()
  createRole(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto,
    @Request() req,
  ) {
    return this.roleService.createRole(createRoleDto, req.user);
  }
  @Get()
  findAll(@Query() name: SearchRoleDto) {
    return this.roleService.findAll(name);
  }
  @Get('all')
  getAll() {
    return this.roleService.getAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
