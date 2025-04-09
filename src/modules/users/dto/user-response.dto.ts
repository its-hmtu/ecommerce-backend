import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ type: 'number', description: 'User ID' })
  @Expose()
  id: number | string;

  @ApiProperty({ type: 'string' })
  @Expose()
  username: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  email: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  profileImage: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  bio: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  sex: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  dob: Date; // Date of Birth

  @ApiProperty({ type: 'string' })
  @Expose()
  phone: string;

  @ApiProperty({ type: 'boolean' })
  @Expose()
  isEmailVerified: boolean;

  @ApiProperty({ type: 'boolean' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: 'boolean' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: 'boolean' })
  @Expose()
  lastLoginAt: Date;

  @ApiProperty({
    type: 'boolean',
    description: 'This is not returned by default',
  })
  @Exclude()
  password: string;
}
