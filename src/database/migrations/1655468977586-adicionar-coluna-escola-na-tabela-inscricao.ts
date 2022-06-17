import {MigrationInterface, QueryRunner} from "typeorm";

export class adicionarColunaEscolaNaTabelaInscricao1655468977586 implements MigrationInterface {
    name = 'adicionarColunaEscolaNaTabelaInscricao1655468977586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inscricao_escola_id_escola" ("escolaId" uuid NOT NULL, "inscricao" uuid NOT NULL, CONSTRAINT "PK_675f788e58ee97448b37572b5b0" PRIMARY KEY ("escolaId", "inscricao"))`);
        await queryRunner.query(`CREATE INDEX "IDX_49ff23007398d944c4ddfa97a9" ON "inscricao_escola_id_escola" ("escolaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9aaab62ba31e4a759ab4832e22" ON "inscricao_escola_id_escola" ("inscricao") `);
        await queryRunner.query(`ALTER TABLE "inscricao_escola_id_escola" ADD CONSTRAINT "FK_49ff23007398d944c4ddfa97a93" FOREIGN KEY ("escolaId") REFERENCES "inscricao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inscricao_escola_id_escola" ADD CONSTRAINT "FK_9aaab62ba31e4a759ab4832e225" FOREIGN KEY ("inscricao") REFERENCES "escola"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inscricao_escola_id_escola" DROP CONSTRAINT "FK_9aaab62ba31e4a759ab4832e225"`);
        await queryRunner.query(`ALTER TABLE "inscricao_escola_id_escola" DROP CONSTRAINT "FK_49ff23007398d944c4ddfa97a93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9aaab62ba31e4a759ab4832e22"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49ff23007398d944c4ddfa97a9"`);
        await queryRunner.query(`DROP TABLE "inscricao_escola_id_escola"`);
    }

}
