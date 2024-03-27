/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ForgetPasswordDto } from '../dto/forget-password.dto.ts';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto.ts';
import { SearchUserDto } from 'src/dto/search-user.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ApiResponse } from 'src/utils/response.util.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  register(registerDto: RegisterDto, roleName: string) {
    return this.userRepository.register(registerDto, roleName);
  }
  async findAll(filterDto: SearchUserDto) {
    return this.userRepository.getUsers(filterDto);
  }

  async findOne(id: number) {
    return this.userRepository.findUserWithId(id);
  }

  login(loginDto: LoginDto) {
    return this.userRepository.login(loginDto);
  }
  logout(req: any) {
    return this.userRepository.logout(req);
  }
  resetPassword(resetPasswordDto: ResetPasswordDto) {
    throw new Error('Method not implemented.');
  }

  verifyEmail(verifyEmaildto: VerifyEmailDto) {
    throw new Error('Method not implemented.');
  }

  forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    throw new Error('Method not implemented.');
  }

  getUserInfo(user: any) {
    return this.findOne(user?.id);
  }
}
