import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from 'generated/prisma';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['USER', 'ADMIN', 'MODERATOR', 'PROVIDER'], required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE', 'BANNED', 'PENDING'], required: false })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
