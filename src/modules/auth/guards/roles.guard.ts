import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are defined, allow access
    }
    console.log('Roles:', roles);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User:', user);
    return this.matchRoles(roles, user.role);
  }
}
