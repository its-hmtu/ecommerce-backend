import { IUser } from './user.interface';

export interface IUserService {
  createUser(user: Partial<IUser>): Promise<IUser>;
  // updateUser(id: number | string, user: Partial<IUser>): Promise<IUser>;
  // getUserById(id: number | string): Promise<IUser>;
  // getUserByUsername(username: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  // getAllUsers(): Promise<IUser[]>;
  // deleteUser(id: number | string): Promise<void>;
}
