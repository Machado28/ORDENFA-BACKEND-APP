import {MigrationInterface, QueryRunner} from "typeorm";

export class aadicionarCampoDeFicheiroNaTabelInscricao1655475042327 implements MigrationInterface {
    name = 'aadicionarCampoDeFicheiroNaTabelInscricao1655475042327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ficheiro" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying, "descricao" character varying, "path" character varying NOT NULL, "url" character varying NOT NULL, "tipo" uuid NOT NULL, CONSTRAINT "PK_994ddf83231c9c04e105c9823a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inscricao_ficheiro_id_ficheiro" ("ficheiroId" uuid NOT NULL, "id" uuid NOT NULL, CONSTRAINT "PK_b99c3f89652fc4251525d0a59ee" PRIMARY KEY ("ficheiroId", "id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d9c44de309e73443379fba5b5c" ON "inscricao_ficheiro_id_ficheiro" ("ficheiroId") `);
        await queryRunner.query(`CREATE INDEX "IDX_137965b485959a4b7731c06e1d" ON "inscricao_ficheiro_id_ficheiro" ("id") `);
        await queryRunner.query(`ALTER TABLE "ficheiro" ADD CONSTRAINT "FK_837fbe8cee5584c90334ea7610d" FOREIGN KEY ("tipo") REFERENCES "tipoDeFicheiro"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inscricao_ficheiro_id_ficheiro" ADD CONSTRAINT "FK_d9c44de309e73443379fba5b5c5" FOREIGN KEY ("ficheiroId") REFERENCES "inscricao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inscricao_ficheiro_id_ficheiro" ADD CONSTRAINT "FK_137965b485959a4b7731c06e1dc" FOREIGN KEY ("id") REFERENCES "ficheiro"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inscricao_ficheiro_id_ficheiro" DROP CONSTRAINT "FK_137965b485959a4b7731c06e1dc"`);
        await queryRunner.query(`ALTER TABLE "inscricao_ficheiro_id_ficheiro" DROP CONSTRAINT "FK_d9c44de309e73443379fba5b5c5"`);
        await queryRunner.query(`ALTER TABLE "ficheiro" DROP CONSTRAINT "FK_837fbe8cee5584c90334ea7610d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_137965b485959a4b7731c06e1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9c44de309e73443379fba5b5c"`);
        await queryRunner.query(`DROP TABLE "inscricao_ficheiro_id_ficheiro"`);
        await queryRunner.query(`DROP TABLE "ficheiro"`);
    }

}
