import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesProductsAndBoxes1770027159283 implements MigrationInterface {
  name = 'CreateTablesProductsAndBoxes1770027159283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "boxes"
                             (
                                 "id"         uuid      NOT NULL DEFAULT uuid_generate_v4(),
                                 "numberName" integer   NOT NULL,
                                 "isFull"     boolean   NOT NULL DEFAULT false,
                                 "createdAt"  TIMESTAMP NOT NULL DEFAULT now(),
                                 CONSTRAINT "UQ_4641d6840972ca92a7b01c9fe05" UNIQUE ("numberName"),
                                 CONSTRAINT "PK_749574b01e0038dae8464fcb445" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "products"
                             (
                                 "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "name"      character varying NOT NULL,
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "boxId"     uuid,
                                 CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"),
                                 CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "products"
        ADD CONSTRAINT "FK_0b04fe076dcb86dd6ae3c2280d9" FOREIGN KEY ("boxId") REFERENCES "boxes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_0b04fe076dcb86dd6ae3c2280d9"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "boxes"`);
  }
}
