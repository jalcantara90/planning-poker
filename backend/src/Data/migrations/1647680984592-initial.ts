import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1647680984592 implements MigrationInterface {
    name = 'initial1647680984592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voting_system_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "value" character varying NOT NULL, "votingSystemId" uuid, CONSTRAINT "PK_ea01defb9c74f1e27940a17d816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voting_system" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_bc5ce6e6f8e60861b758e52a0e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "votingSystemId" uuid, CONSTRAINT "REL_f15632210ba03e6fb3178d9243" UNIQUE ("votingSystemId"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "voting_system_option" ADD CONSTRAINT "FK_0017e963875bbe7cf64b7724024" FOREIGN KEY ("votingSystemId") REFERENCES "voting_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_f15632210ba03e6fb3178d92437" FOREIGN KEY ("votingSystemId") REFERENCES "voting_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_f15632210ba03e6fb3178d92437"`);
        await queryRunner.query(`ALTER TABLE "voting_system_option" DROP CONSTRAINT "FK_0017e963875bbe7cf64b7724024"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "voting_system"`);
        await queryRunner.query(`DROP TABLE "voting_system_option"`);
    }

}
