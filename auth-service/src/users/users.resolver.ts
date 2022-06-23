import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { UserDecorator } from '../../decorators/user.decorator'
import { AuthGuard } from '../auth/guard/auth.guard'
import { Roles } from '../auth/guard/roles-auth.decorator'
import { JwtPayload } from '../auth/interfaces/jwtpayload.interface'
import { RolesEnum } from '../enums/roles.enum'

import { AddUserDataInput } from './graphql/inputs/addUserData.input'
import { UserObject } from './graphql/objects/user.object'
import { UsersService } from './users.service'



@Resolver(() => UserObject)
export class UsersResolver {
    constructor(private readonly _usersService: UsersService) {}

    // Добавление данных о пользователе, возвращает id данных из бд
    @Roles(RolesEnum.USER)
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    async addUserData(
        @Args('input') input: AddUserDataInput,
        @UserDecorator() user: JwtPayload,
    ): Promise<string> {
        return await this._usersService.addUserData({
            ...input,
            userId: user.sub,
        })
    }
}
