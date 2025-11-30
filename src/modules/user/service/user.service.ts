import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole, UserStatus } from 'generated/prisma';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        role: createUserDto.role || UserRole.USER,
        status: createUserDto.status || UserStatus.PENDING,
      },
    });

    return user;
  }
}
