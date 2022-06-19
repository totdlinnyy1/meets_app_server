import { MigrationInterface, QueryRunner } from 'typeorm'

export class RefactorUser1655641487589 implements MigrationInterface {
    name = 'RefactorUser1655641487589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "last_name" TO "lastName"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "lastName" TO "last_name"
        `)
    }
}
