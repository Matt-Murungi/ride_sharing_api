import { SetMetadata } from '@nestjs/common';
import { Role } from './user.roles.enum';

export const USER_ROLE_KEY = 'roles';
export const UserRoles = (...roles: Role[]) =>
    SetMetadata(USER_ROLE_KEY, roles);
