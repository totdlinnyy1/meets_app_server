import { Column, DeleteDateColumn, Entity, OneToOne } from 'typeorm'

import { BaseAudit } from '../../entities/base.entity'
import { RolesEnum } from '../../enums/roles.enum'

import { UserDataEntity } from './userData.entity'

@Entity('users')
export class UserEntity extends BaseAudit {
    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'date' })
    birthday: Date

    @Column({ type: 'text', nullable: true })
    avatar?: string

    @Column({ type: 'boolean', default: false })
    isEmailConfirmed: boolean

    @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.USER })
    role: RolesEnum

    @OneToOne(() => UserDataEntity)
    data: UserDataEntity

    @DeleteDateColumn()
    deletedAt: Date
}
