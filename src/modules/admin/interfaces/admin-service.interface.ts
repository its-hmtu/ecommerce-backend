import { IAdmin } from './admin.interface';

export interface IAdminService {
  // createAdmin(adminData: Partial<IAdmin>): Promise<IAdmin>;
  findById(id: number | string): Promise<IAdmin | null>;
  findByEmail(email: string): Promise<IAdmin | null>;
  // updateAdmin(
  //   id: number | string,
  //   adminData: Partial<IAdmin>,
  // ): Promise<IAdmin | null>;
  // deleteAdmin(id: number | string): Promise<boolean>;
  // getAllAdmins(): Promise<IAdmin[]>;
  // login(username: string, password: string): Promise<IAdmin | null>;
  // logout(adminId: number | string): Promise<boolean>;
}
