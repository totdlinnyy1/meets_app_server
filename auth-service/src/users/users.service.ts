import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { parse, format } from 'date-fns'
import { Repository } from 'typeorm'

import { RolesEnum } from '../enums/roles.enum'

import { AddUserDataDto } from './dtos/addUserData.dto'
import { CreateUserDto } from './dtos/createUser.dto'
import { LoginUserDto } from './dtos/loginUser.dto'
import { UserSignDataDto } from './dtos/userSignData.dto'
import { UserEntity } from './entities/user.entity'
import { UserDataEntity } from './entities/userData.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _usersRepository: Repository<UserEntity>,
        @InjectRepository(UserDataEntity)
        private readonly _usersDataRepository: Repository<UserDataEntity>,
    ) {}

    // Функция получет пользователя по id
    async userById(id: string): Promise<UserEntity> {
        const user = await this._usersRepository.findOne(id)

        // Если пользователь не найден, то возращаем ошибку
        if (!user) {
            throw new Error('Такого пользователя не существует')
        }

        return user
    }

    // Функция получет пользователя по id
    async userByEmail(email: string): Promise<UserEntity> {
        const user = await this._usersRepository.findOne({ email })

        // Если пользователь не найден, то возращаем ошибку
        if (!user) {
            throw new Error('Такого пользователя не существует')
        }

        return user
    }

    // Функция создания обычного пользователя
    async createUser(input: CreateUserDto): Promise<UserSignDataDto> {
        try {
            // Ищем создан ли уже такой пользователь
            const candidate = await this.userByEmail(input.email)
            // Если создан то возвращаем ошибку
            if (candidate) {
                throw new Error('Такой пользователь уже существует')
            }

            // Изменяем дату под формат бд
            const date = parse(input.birthday, 'dd/MM/yyyy', new Date())

            // Сохраняем в бд
            const user = await this._usersRepository.save({
                ...input,
                password: await this.hashPassword(input.password),
                birthday: format(date, 'yyyy-MM-dd'),
                role: RolesEnum.USER,
            })

            return user
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // Функция проверки данных пользователя
    async login(input: LoginUserDto): Promise<UserSignDataDto> {
        const { email, password } = input

        // Ищем полььзователя
        const user = await this.userByEmail(email)

        // Если такого нет, то возращаем ошибку
        if (!user) {
            throw new BadRequestException('Некорректные данные')
        }

        // Проверям пароль
        const passwordMatch = await compare(password, user.password)

        // Если неверный, то возращаем ошибку
        if (!passwordMatch) {
            throw new BadRequestException('Некорректные данные')
        }

        return user
    }

    // Функция добавления данных пользователя
    async addUserData(input: AddUserDataDto): Promise<string> {
        // Проверяем существует ли такой пользователь
        await this.userById(input.userId)

        // Сохраняем его данные
        await this._usersDataRepository.save(input)
        return input.userId
    }

    // Функция удаления пользователя
    async deleteUser(id: string): Promise<boolean> {
        // Ищем еть ли такой пользователь
        await this.userById(id)

        // Удаляем пользователя
        await this._usersRepository.softDelete(id)
        return true
    }

    // Функция хэширования пароля
    protected async hashPassword(password: string): Promise<string> {
        const ROUNDS = 12

        const salt = await genSalt(ROUNDS)
        const hashedPassword = await hash(password, salt)

        return hashedPassword
    }
}
