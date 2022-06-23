import { Column, Entity } from 'typeorm'

import { BaseAudit } from '../../entities/base.entity'

@Entity('users_data')
export class UserDataEntity extends BaseAudit {
    @Column('uuid')
    userId: string

    @Column('text', { nullable: true })
    bio?: string

    @Column('text', { array: true })
    entertainments: string[]
}
