import {MigrationInterface, QueryRunner} from "typeorm";

export class atipoDeFicheiro1655470108863 implements MigrationInterface {
    name = 'atipoDeFicheiro1655470108863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipoDeFicheiro" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying, "descricao" character varying, CONSTRAINT "PK_b27d8df919c890df4e56c5d3515" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipoDeFicheiro"`);
    }

}
