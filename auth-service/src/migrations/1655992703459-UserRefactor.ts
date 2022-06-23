import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserRefactor1655992703459 implements MigrationInterface {
    name = 'UserRefactor1655992703459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users_data" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                "bio" text,
                "entertainments" text array NOT NULL,
                CONSTRAINT "PK_821939ad6401aa5b7a015be4973" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" text NOT NULL,
                "email" text NOT NULL,
                "password" text NOT NULL,
                "birthday" date NOT NULL,
                "avatar" text,
                "isEmailConfirmed" boolean NOT NULL DEFAULT false,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `)
        await queryRunner.query(`
            DROP TABLE "users_data"
        `)
    }
}
