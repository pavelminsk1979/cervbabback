import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatTableProducts1769786849132 implements MigrationInterface {
  name = 'CreatTableProducts1769786849132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "products"
                             (
                                 "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "name"      character varying NOT NULL,
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "deletedAt" TIMESTAMP,
                                 CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"),
                                 CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
