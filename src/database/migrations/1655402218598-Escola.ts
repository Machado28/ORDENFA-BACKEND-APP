import {MigrationInterface, QueryRunner} from "typeorm";

export class Escola1655402218598 implements MigrationInterface {
    name = 'Escola1655402218598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "escola" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "tipo" character varying NOT NULL, CONSTRAINT "PK_447d6d45b04cc04665709b39eae" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "escola"`);
    }

}
