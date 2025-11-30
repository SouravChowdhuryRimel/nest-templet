import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppError } from 'src/errors/AppError';
import { UserStatus } from 'generated/prisma';
import { TLoginUserDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginUser(payload: TLoginUserDto) {
    const { email, password } = payload;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new AppError(HttpStatus.NOT_FOUND, 'This user is not found!');
    if (user.isDeleted) throw new AppError(HttpStatus.FORBIDDEN, 'This user is deleted!');
    if (user.status === UserStatus.BANNED)
      throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked!');

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new AppError(HttpStatus.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload = {
      userId: user.id,
      role: user.role,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET')!,
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN') as any,
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
