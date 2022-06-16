import {MigrationInterface, QueryRunner} from "typeorm";

export class contacto1655347083532 implements MigrationInterface {
    name = 'contacto1655347083532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacto" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying, "descricao" character varying, "tipo" uuid NOT NULL, CONSTRAINT "PK_fcab8128cce0aac92da26cf1883" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_8def3597bd97a1be2ebd78d55a9" FOREIGN KEY ("tipo") REFERENCES "tipoDecontacto"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_8def3597bd97a1be2ebd78d55a9"`);
        await queryRunner.query(`DROP TABLE "contacto"`);
    }

}
