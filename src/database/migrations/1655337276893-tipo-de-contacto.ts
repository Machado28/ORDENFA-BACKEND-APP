import {MigrationInterface, QueryRunner} from "typeorm";

export class tipoDeContacto1655337276893 implements MigrationInterface {
    name = 'tipoDeContacto1655337276893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipoDecontacto" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying, "descricao" character varying, CONSTRAINT "PK_ba76240bbad21b53d9bae9c9ad3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipoDecontacto"`);
    }

}
