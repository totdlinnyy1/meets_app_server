import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { AuthService } from '../auth.service'

import { ROLES_KEY } from './roles-auth.decorator'

// Проверка аторизован ли ползователь
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _authService: AuthService,
        private readonly _reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Роли, которые должны иметься у пользователя
        const requiredRoles = this._reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        )

        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req
        const authorization = req.headers.authorization

        // Если в header нет поля authorization, то возвращаем ошибку
        if (authorization == undefined) {
            throw new BadRequestException(
                'GqlAuthorizationHeader: header authorization is empty',
            )
        }

        // Получем данные из токена
        const user = await this._authService.decodeToken(authorization)

        req.user = user

        // Проверяем есть ли у пользователя нужные роли
        return requiredRoles.includes(user.role)
    }
}
