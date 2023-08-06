import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

const users = [
  {
    id: '1',
    email: 'johndoe@gmail.com',
    password: '123456',
    name: 'John Doe',
  },
];

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private JWT: JwtService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await argon.hash(registerDto.password);
    delete registerDto.password;

    try {
      users.push({
        ...registerDto,
        password: hashedPassword,
        id: users.length + 1 + '',
      });

      const token = await this.signToken(registerDto);
      return { user: registerDto, ...token, message: 'User created' };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = users.find((user) => user.email === loginDto.email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = await this.signToken(user);
    return { user, ...token, message: 'User logged in' };
  }

  delete(id: string) {
    return `This action removes a #${id} auth`;
  }

  async signToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.JWT.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
    };
  }
}
