import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'

import { UserEntity } from './entities/user.entity'
import { UserDataEntity } from './entities/userData.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserDataEntity]),
        forwardRef(() => AuthModule),
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
