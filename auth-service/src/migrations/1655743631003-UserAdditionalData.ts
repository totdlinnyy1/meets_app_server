import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserAdditionalData1655743631003 implements MigrationInterface {
    name = 'UserAdditionalData1655743631003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_data" DROP COLUMN "role"
        `)
        await queryRunner.query(`
            DROP TYPE "public"."users_data_role_enum"
        `)
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "role"
            SET DEFAULT 'user'
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "role" DROP DEFAULT
        `)
        await queryRunner.query(`
            CREATE TYPE "public"."users_data_role_enum" AS ENUM('user', 'moderator', 'admin', 'superadmin')
        `)
        await queryRunner.query(`
            ALTER TABLE "users_data"
            ADD "role" "public"."users_data_role_enum" NOT NULL
        `)
    }
}
