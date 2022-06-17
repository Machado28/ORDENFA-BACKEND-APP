import {MigrationInterface, QueryRunner} from "typeorm";

export class inscricao1655394788997 implements MigrationInterface {
    name = 'inscricao1655394788997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inscricao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "estado" boolean NOT NULL, "cursoId" uuid, "membroId" uuid, CONSTRAINT "PK_c28e1e6a95a31f051e60b499382" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inscricao" ADD CONSTRAINT "FK_008f47a92cc5830e611002de52b" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inscricao" ADD CONSTRAINT "FK_bf55e5bed011bdfb219b799e935" FOREIGN KEY ("membroId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inscricao" DROP CONSTRAINT "FK_bf55e5bed011bdfb219b799e935"`);
        await queryRunner.query(`ALTER TABLE "inscricao" DROP CONSTRAINT "FK_008f47a92cc5830e611002de52b"`);
        await queryRunner.query(`DROP TABLE "inscricao"`);
    }

}
