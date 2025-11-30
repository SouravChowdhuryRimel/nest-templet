import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TLoginUserDto } from '../dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.services';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: TLoginUserDto) {
    const data = await  this.authService.loginUser(loginDto)
    return   {
      message: 'Login User successfully',
      data
    };
    
  }
}
