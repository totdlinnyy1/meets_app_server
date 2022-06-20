import { MigrationInterface, QueryRunner } from 'typeorm'

export class RefactorUser1655651783734 implements MigrationInterface {
    name = 'RefactorUser1655651783734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar" DROP NOT NULL
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar"
            SET NOT NULL
        `)
    }
}
