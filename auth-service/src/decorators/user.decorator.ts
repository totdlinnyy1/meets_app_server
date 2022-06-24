import { createParamDecorator } from '@nestjs/common'

// Получение пользователя из request если он авторизован
export const UserDecorator = createParamDecorator(
    (_, req) => req.args[2].req.user,
)
