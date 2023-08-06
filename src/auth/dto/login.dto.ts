import { PartialType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class LoginDto extends PartialType(RegisterDto) {}
