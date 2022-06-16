import {MigrationInterface, QueryRunner} from "typeorm";

export class login1655372152623 implements MigrationInterface {
    name = 'login1655372152623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying NOT NULL, "contactoId" uuid, "usuarioId" uuid, CONSTRAINT "REL_cac2db44840cd3628678339c75" UNIQUE ("contactoId"), CONSTRAINT "REL_dc52632bee883d991c3a6b36c6" UNIQUE ("usuarioId"), CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_cac2db44840cd3628678339c75c" FOREIGN KEY ("contactoId") REFERENCES "contacto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_dc52632bee883d991c3a6b36c62" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_dc52632bee883d991c3a6b36c62"`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_cac2db44840cd3628678339c75c"`);
        await queryRunner.query(`DROP TABLE "login"`);
    }

}
