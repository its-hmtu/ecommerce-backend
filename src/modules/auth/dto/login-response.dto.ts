import { IUser } from 'src/modules/users/interfaces/user.interface';

export class LoginResponseDto {
  user: IUser;
  access_token: string;
}
