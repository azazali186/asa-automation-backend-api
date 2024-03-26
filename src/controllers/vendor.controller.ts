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
import { CreateVendorDto } from 'src/dto/vendor/create-vendor.dto';
import { SearchVendorDto } from 'src/dto/vendor/search-vendor.dto';
import { UpdateVendorDto } from 'src/dto/vendor/update-vendor.dto';
import { CommonStatus } from 'src/enum/common-status.enum';
import { CommonStatusValidationPipes } from 'src/pipes/user-status-validation.pipe';
import { VendorService } from 'src/services/vendor.service';
import { ApiResponse } from 'src/utils/response.util';

@ApiTags(`Vendor Management`)
@ApiBearerAuth()
@Controller(`${process.env.VENDOR_ROLE_NAME}`)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vendorService.remove(id);
  }

  @ApiQuery({ name: 'status', enum: CommonStatus })
  @Get('')
  findAllVendors(
    @Query(CommonStatusValidationPipes) filterDto: SearchVendorDto,
  ): Promise<ApiResponse<any>> {
    return this.vendorService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vendorService.findOne(id);
  }

  @Post('')
  createVendor(
    @Body() createDto: CreateVendorDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.vendorService.create(createDto, req.user.id);
  }

  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ApiResponse<any>> {
    return this.vendorService.changePassword(changePasswordDto);
  }

  @Get('slug/:slug')
  findSlug(@Param('slug') slug: string) {
    return this.vendorService.findSlug(slug);
  }

  @Get('shop/details/:slug')
  findShop(@Param('slug') slug: string) {
    return this.vendorService.findShop(slug);
  }

  @Patch(':id')
  updateVendor(
    @Param('id') id: number,
    @Body() updateDto: UpdateVendorDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.vendorService.updateUser(id, updateDto, req.user);
  }
}
