export interface IAdmin {
  id: number | string;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  isActive: boolean;
  isDeleted: boolean;
}
