import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddUserDataInput {
    @Field(() => String, { description: 'Био пользователя', nullable: true })
    bio?: string

    @Field(() => [String], { description: 'Увлечения пользователя' })
    entertainments: string[]
}
