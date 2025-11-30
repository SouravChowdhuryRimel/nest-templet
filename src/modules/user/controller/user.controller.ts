import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto:CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
     
    return {
      message: 'User created successfully',
      data: createdUser,
    };
  }
}
