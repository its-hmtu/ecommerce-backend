import { Role } from 'src/common/enums';

export interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}
