import {MigrationInterface, QueryRunner} from "typeorm";

export class adicionarCampoUsuarioIdEmContacto1655370619736 implements MigrationInterface {
    name = 'adicionarCampoUsuarioIdEmContacto1655370619736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" ADD "usuarioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757"`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP COLUMN "usuarioId"`);
    }

}
