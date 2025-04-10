import { IUser } from './user.interface';

export interface IUserService {
  createUser(user: Partial<IUser>): Promise<IUser>;
  // updateUser(id: number | string, user: Partial<IUser>): Promise<IUser>;
  findById(id: number | string): Promise<IUser>;
  findByUsername(username: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  // deleteUser(id: number | string): Promise<void>;
}
