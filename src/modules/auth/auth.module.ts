import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.services';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
