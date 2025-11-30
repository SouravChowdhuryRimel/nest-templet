import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TLoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
