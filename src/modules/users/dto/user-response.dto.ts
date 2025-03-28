import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number | string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  profileImage: string;

  @Expose()
  bio: string;

  @Expose()
  sex: string;

  @Expose()
  dob: Date; // Date of Birth

  @Expose()
  phone: string;

  @Expose()
  isEmailVerified: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  lastLoginAt: Date;

  @Exclude()
  password: string;
}
