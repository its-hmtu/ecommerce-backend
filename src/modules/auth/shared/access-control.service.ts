import { Injectable } from '@nestjs/common';
import { IsAuthorizedParams } from '../interfaces/access-control.interface';
import { Role } from 'src/common/enums';

@Injectable()
export class AccessControlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildHierarchy([Role.GUEST, Role.USER, Role.ADMIN]);
    this.buildHierarchy([Role.MODERATOR, Role.ADMIN]);
  }

  private buildHierarchy(roles: Role[]) {
    const hierarchy: Map<string, number> = new Map();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({
    currentRole,
    requiredRole,
  }: IsAuthorizedParams): boolean {
    for (let hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
}
