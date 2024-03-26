import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from 'src/dto/change-password.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SearchUserDto } from 'src/dto/search-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { CommonStatus } from 'src/enum/common-status.enum';
import { CommonStatusValidationPipes } from 'src/pipes/user-status-validation.pipe';
import { UserService } from 'src/services/user.service';
import { ApiResponse } from 'src/utils/response.util';

@ApiTags('User Management')
@ApiBearerAuth()
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('users/:id')
  remove(@Param('id') id: number) {
    // console.log('remove user called', id);
    return this.userService.remove(id);
  }

  @ApiQuery({ name: 'status', enum: CommonStatus })
  @Get('users')
  findAll(
    @Query(CommonStatusValidationPipes) filterDto: SearchUserDto,
  ): Promise<ApiResponse<any>> {
    filterDto.role = 'admin';
    return this.userService.findAll(filterDto);
  }

  @Get('users/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('users')
  CreateUser(
    @Body() updateUserDto: CreateUserDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.userService.create(updateUserDto, req.user.id);
  }

  @Patch('users/change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.userService.changePassword(changePasswordDto, req);
  }

  @Patch('users/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.userService.updateUser(id, updateUserDto, req.user);
  }
}
