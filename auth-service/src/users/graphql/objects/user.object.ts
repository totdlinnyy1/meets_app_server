import { Field, ObjectType } from '@nestjs/graphql'

import { RolesEnum } from '../../../enums/roles.enum'

@ObjectType('User')
export class UserObject {
    @Field(() => String, { description: 'Id пользователя' })
    id: string

    @Field(() => String, { description: 'Имя пользователя' })
    name: string

    @Field(() => String, { description: 'Почта пользователя' })
    email: string

    @Field(() => String, { description: 'Дата рождения' })
    birthday: Date

    @Field(() => String, { description: 'Ссылка на автарку' })
    avatar?: string

    @Field(() => String, { description: 'Подтверждена ли почта' })
    isEmailConfirmed: boolean

    @Field(() => String, { description: 'Роль пользователя' })
    role: RolesEnum

    @Field(() => String, { description: 'Дата удаления' })
    deletedAt: Date

    @Field(() => String, { description: 'Дата создания' })
    createdAt: Date

    @Field(() => String, { description: 'Дата обновления' })
    updatedAt: Date
}
