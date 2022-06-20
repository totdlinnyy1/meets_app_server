import { Entity, Column } from 'typeorm'

import { BaseAudit } from '../../entities/base.entity'

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseAudit {
    @Column()
    userId: string

    @Column()
    token: string

    @Column()
    expiresAt: Date
}
