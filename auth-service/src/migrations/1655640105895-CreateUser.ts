import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUser1655640105895 implements MigrationInterface {
    name = 'CreateUser1655640105895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isEmailConfirmed"
            SET DEFAULT true
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isEmailConfirmed"
            SET DEFAULT false
        `)
    }
}
