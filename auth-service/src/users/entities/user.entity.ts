import { Column, Entity } from 'typeorm'

import { BaseAudit } from '../../entities/base.entity'
import { RolesEnum } from '../../enums/roles.enum'

@Entity('user')
export class UserEntity extends BaseAudit {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    lastName: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'date' })
    birthday: Date

    @Column({ type: 'text' })
    avatar: string

    @Column({ type: 'boolean', default: false })
    isEmailConfirmed: boolean

    @Column({ type: 'enum', enum: RolesEnum })
    role: RolesEnum
}
