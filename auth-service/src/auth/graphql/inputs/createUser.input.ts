import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 14

const MAX_LAST_NAME_LENGTH = 20

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 6

const dataFormat =
    '^(0?[1-9]|[12][0-9]|3[01])([ \\/\\-])(0?[1-9]|1[012])\\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$'

@InputType({ description: 'Инпут для создания пользователя' })
export class CreateUserInput {
    @MinLength(MIN_NAME_LENGTH, {
        message: `Не меньше ${MIN_NAME_LENGTH} символов`,
    })
    @MaxLength(MAX_NAME_LENGTH, {
        message: `Не больше ${MAX_NAME_LENGTH} символов`,
    })
    @Field(() => String, { description: 'Имя пользователя' })
    name: string

    @MinLength(MIN_NAME_LENGTH, {
        message: `Не меньше ${MIN_NAME_LENGTH} символов`,
    })
    @MaxLength(MAX_LAST_NAME_LENGTH, {
        message: `Не больше ${MAX_LAST_NAME_LENGTH} символов`,
    })
    @Field(() => String, { description: 'фамилия пользователя' })
    lastName: string

    @IsEmail({}, { message: 'Некорректная почта' })
    @Field(() => String, { description: 'Почта пользователя' })
    email: string

    @MinLength(MIN_PASSWORD_LENGTH, {
        message: `Не меньше ${MIN_PASSWORD_LENGTH} символов`,
    })
    @MaxLength(MAX_PASSWORD_LENGTH, {
        message: `Не больше ${MAX_PASSWORD_LENGTH} символов`,
    })
    @Field(() => String, { description: 'Пароль пользователя' })
    password: string

    @Matches(dataFormat, '', { message: 'Некорректный формат даты' })
    @Field(() => String, { description: 'Дата рожденияя пользователя' })
    birthday: string
}
