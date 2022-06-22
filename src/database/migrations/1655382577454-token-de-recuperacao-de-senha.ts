import {MigrationInterface, QueryRunner} from "typeorm";

export class tokenDeRecuperacaoDeSenha1655382577454 implements MigrationInterface {
    name = 'tokenDeRecuperacaoDeSenha1655382577454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying, "expiracao" character varying, "usuario" character varying, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757"`);
        await queryRunner.query(`ALTER TABLE "contacto" ALTER COLUMN "usuarioId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757"`);
        await queryRunner.query(`ALTER TABLE "contacto" ALTER COLUMN "usuarioId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
