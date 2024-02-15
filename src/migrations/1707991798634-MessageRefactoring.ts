import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class MessageRefactoring1707991798634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "message" (
                "id" uuid NOT NULL,
                "userid" bigint NOT NULL,
                "username" character varying(255),
                "firstName" character varying(255),
                "message" text NOT NULL,
                "timestamp" timestamp NOT NULL,
                "chatid" bigint NOT NULL,
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "message"`);
  }
}
