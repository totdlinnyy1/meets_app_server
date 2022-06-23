import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { CreateUserDto } from '../users/dtos/createUser.dto'

// Пайп для проверки вводимых данных
@Injectable()
export class UserValidationPipe implements PipeTransform {
    async transform(
        value: CreateUserDto,
        { metatype }: ArgumentMetadata,
    ): Promise<CreateUserDto> {
        if (!metatype || !this._toValidate(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object)

        if (errors.length > 0) {
            // Возрат ошибок в объекте {поле - ошибка}
            const messages = errors.map((err) => {
                if (err.constraints) {
                    const property = err.property
                    return {
                        [property]: Object.values(err.constraints).join(', '),
                    }
                }
                return ''
            })
            throw new BadRequestException(messages)
        }
        return value
    }

    private _toValidate(metatype: unknown): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype as ArrayConstructor)
    }
}
