import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBoxes1769974771196 implements MigrationInterface {
    name = 'CreateTableBoxes1769974771196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boxes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isFull" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_749574b01e0038dae8464fcb445" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "boxId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0b04fe076dcb86dd6ae3c2280d9" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "products" DROP CONSTRAINT "FK_0b04fe076dcb86dd6ae3c2280d9"`,
      );
      await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "boxId"`);
      await queryRunner.query(`DROP TABLE "boxes"`);
    }

}
