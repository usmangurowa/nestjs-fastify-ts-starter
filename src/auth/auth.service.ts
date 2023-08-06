import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return 'This action adds a new auth';
  }

  login(loginDto: LoginDto) {
    return `This action returns all auth`;
  }

  delete(id: string) {
    return `This action removes a #${id} auth`;
  }
}
