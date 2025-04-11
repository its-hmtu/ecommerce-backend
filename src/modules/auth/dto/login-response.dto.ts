import { IAdmin } from 'src/modules/admin/interfaces/admin.interface';
import { IUser } from 'src/modules/users/interfaces/user.interface';

export class LoginResponseDto {
  user: IUser | IAdmin;
  access_token: string;
}
