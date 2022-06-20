import { UsePipes } from '@nestjs/common'
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'

import { UserValidationPipe } from '../pipes/userValidation.pipe'

import { AuthService } from './auth.service'
import { CreateUserInput } from './graphql/inputs/createUser.input'
import { LoginUserInput } from './graphql/inputs/loginUser.input'
import { AuthType } from './graphql/types/auth.type'

@Resolver(() => String)
export class AuthResolver {
    constructor(private readonly _authService: AuthService) {}

    @UsePipes(new UserValidationPipe())
    @Mutation(() => AuthType)
    async signUp(@Args('input') input: CreateUserInput): Promise<AuthType> {
        return await this._authService.signUp(input)
    }

    @Query(() => AuthType)
    async signIn(@Args('input') input: LoginUserInput): Promise<AuthType> {
        return await this._authService.signIn(input)
    }

    @Mutation(() => AuthType)
    async refreshToken(
        @Args('refreshToken') refreshToken: string,
        @Args('accessToken') accessToken: string,
    ): Promise<AuthType> {
        return await this._authService.getAccessTokenFromRefreshToken(
            refreshToken,
            accessToken,
        )
    }
}
