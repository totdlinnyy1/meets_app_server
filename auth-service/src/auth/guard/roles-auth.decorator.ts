import { SetMetadata } from '@nestjs/common'

import { RolesEnum } from '../../enums/roles.enum'

export const ROLES_KEY = 'roles'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles)
