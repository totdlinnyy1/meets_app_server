import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dtos/createUser.dto'
import { LoginUserDto } from './dtos/loginUser.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
    private _logger = new Logger(UsersService.name)

    constructor(
        @InjectRepository(UserEntity)
        private readonly _usersRepository: Repository<UserEntity>,
    ) {}

    async createUser(input: CreateUserDto): Promise<string> {
        try {
            const user = await this._usersRepository.create({
                ...input,
                password: await this.hashPassword(input.password),
            })
            return user.id
        } catch (error) {
            this._logger.error(error, 'createUser method error')
            throw new InternalServerErrorException(error)
        }
    }

    async login(input: LoginUserDto): Promise<string> {
        const { email, password } = input

        const user = await this._usersRepository.findOne({
            email,
        })

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Invalid credentials')
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
