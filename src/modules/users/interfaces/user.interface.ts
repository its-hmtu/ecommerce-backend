export interface IUser {
  id: string | number;
  username: string;
  password: string;
  email: string;
  profileImage: string;
  bio: string;
  sex: string;
  dob: Date; // Date of Birth
  phone: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}
