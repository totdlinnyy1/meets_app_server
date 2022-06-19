import { MigrationInterface, QueryRunner } from 'typeorm'

export class RefactorUser1655640166922 implements MigrationInterface {
    name = 'RefactorUser1655640166922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isEmailConfirmed"
            SET DEFAULT false
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "isEmailConfirmed"
            SET DEFAULT true
        `)
    }
}
