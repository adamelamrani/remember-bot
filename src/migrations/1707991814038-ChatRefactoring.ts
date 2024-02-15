import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class ChatRefactoring1707991814038 implements MigrationInterface {
  name = 'ChatRefactoring1707991814038';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "chat" (
                "chatid" bigint NOT NULL,
                "chatname" character varying(255) NOT NULL,
                CONSTRAINT "PK_chat_chatid" PRIMARY KEY ("chatid"),
                CONSTRAINT "UQ_chat_chatname" UNIQUE ("chatname")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chat"`);
  }
}
