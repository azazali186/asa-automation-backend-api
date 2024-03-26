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
import { CreateMemberDto } from 'src/dto/member/create-member.dto';
import { SearchMemberDto } from 'src/dto/member/search-member.dto';
import { UpdateMemberDto } from 'src/dto/member/update-member.dto';
import { CommonStatus } from 'src/enum/common-status.enum';
import { CommonStatusValidationPipes } from 'src/pipes/user-status-validation.pipe';
import { MemberService } from 'src/services/member.service';
import { ApiResponse } from 'src/utils/response.util';

@ApiTags(`Member Management`)
@ApiBearerAuth()
@Controller(`${process.env.MEMBER_ROLE_NAME}`)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.memberService.remove(id);
  }

  @ApiQuery({ name: 'status', enum: CommonStatus })
  @Get(``)
  findAllMembers(
    @Query(CommonStatusValidationPipes) filterDto: SearchMemberDto,
  ): Promise<ApiResponse<any>> {
    return this.memberService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.memberService.findOne(id);
  }

  @Post('')
  createMember(
    @Body() createDto: CreateMemberDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.memberService.create(createDto, req.user.id);
  }

  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ApiResponse<any>> {
    return this.memberService.changePassword(changePasswordDto);
  }

  @Patch(':id')
  updateMember(
    @Param('id') id: number,
    @Body() updateDto: UpdateMemberDto,
    @Request() req,
  ): Promise<ApiResponse<any>> {
    return this.memberService.updateUser(id, updateDto, req.user);
  }
}
