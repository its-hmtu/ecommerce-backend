import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessControlService } from '../shared/access-control.service';
import { Role } from 'src/common/enums';
import { ROLE_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    // const token = request.headers['authorization'].split(' ')[1];

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        currentRole: request.user.role,
        requiredRole: role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}
