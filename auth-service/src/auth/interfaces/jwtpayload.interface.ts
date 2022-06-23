import { RolesEnum } from '../../enums/roles.enum'

export interface JwtPayload {
    sub: string
    role: RolesEnum
    iat?: number
    exp?: number
    jti?: string
}
