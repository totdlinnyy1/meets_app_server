import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import {GraphQLModule} from '@nestjs/graphql'
import {graphqlConfig} from './config/graphql.config'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
      GraphQLModule.forRoot(graphqlConfig)
    ],
})
export class AppModule {}
