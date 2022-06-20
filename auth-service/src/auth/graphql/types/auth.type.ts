import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('Auth', { description: 'Ответ при входе или регистрации' })
export class AuthType {
    @Field(() => String, { description: 'Токен доступа' })
    accessToken: string

    @Field(() => String, { description: 'Токен обновления' })
    refreshToken?: string
}
