import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { parse, format } from 'date-fns'
import { Repository } from 'typeorm'

import { RolesEnum } from '../enums/roles.enum'

import { CreateUserDto } from './dtos/createUser.dto'
import { LoginUserDto } from './dtos/loginUser.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _usersRepository: Repository<UserEntity>,
    ) {}

    async createUser(input: CreateUserDto): Promise<string> {
        try {
            const candidate = await this._usersRepository.findOne({
                email: input.email,
            })
            if (candidate) {
                throw new Error('Такой пользователь уже существует')
            }

            const date = parse(input.birthday, 'dd/MM/yyyy', new Date())
            const user = await this._usersRepository.save({
                ...input,
                password: await this.hashPassword(input.password),
                birthday: format(date, 'yyyy-MM-dd'),
                role: RolesEnum.USER,
            })

            return user.id
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async login(input: LoginUserDto): Promise<string> {
        const { email, password } = input

        const user = await this._usersRepository.findOne({
            email,
        })

        if (!user) {
            throw new BadRequestException('Некорректные данные')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new BadRequestException('Некорректные данные')
        }

        return user.id
    }

    protected async hashPassword(password: string): Promise<string> {
        const ROUNDS = 12

        const salt = await genSalt(ROUNDS)
        const hashedPassword = await hash(password, salt)

        return hashedPassword
    }
}
