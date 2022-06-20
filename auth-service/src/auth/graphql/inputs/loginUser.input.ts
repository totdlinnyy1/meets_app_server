import { Field, InputType } from '@nestjs/graphql'

@InputType({ description: 'Инпут для входа пользователя' })
export class LoginUserInput {
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}
