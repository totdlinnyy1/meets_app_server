import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenEntity } from '../users/entities/refresh-token.entity'
import { UsersModule } from '../users/users.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([RefreshTokenEntity]),
        UsersModule,
        ConfigModule,
    ],
    providers: [AuthService, AuthResolver],
})
export class AuthModule {}
