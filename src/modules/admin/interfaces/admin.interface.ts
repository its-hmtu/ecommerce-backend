import { Role } from 'src/common/enums';

export interface IAdmin {
  id: number | string;
  username: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  isActive: boolean;
  isDeleted: boolean;
}
