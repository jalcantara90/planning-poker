import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialForProduction1648970425257 implements MigrationInterface {
    name = 'InitialForProduction1648970425257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_352a30652cd352f552fef73dec5" DEFAULT NEWSEQUENTIALID(), "isActive" bit NOT NULL CONSTRAINT "DF_54b5ee8dd034ccfe66dfb25874b" DEFAULT 1, "name" varchar(255) NOT NULL, "votingSystemId" uniqueidentifier, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voting_system" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_bc5ce6e6f8e60861b758e52a0e5" DEFAULT NEWSEQUENTIALID(), "isActive" bit NOT NULL CONSTRAINT "DF_1990e144042ea6b3e359b9f8ca0" DEFAULT 1, "name" varchar(255) NOT NULL, CONSTRAINT "PK_bc5ce6e6f8e60861b758e52a0e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voting_system_option" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_ea01defb9c74f1e27940a17d816" DEFAULT NEWSEQUENTIALID(), "isActive" bit NOT NULL CONSTRAINT "DF_cd2789024ed4aa4fa9b4c520b41" DEFAULT 1, "value" nvarchar(255) NOT NULL, "votingSystemId" uniqueidentifier, CONSTRAINT "PK_ea01defb9c74f1e27940a17d816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_f15632210ba03e6fb3178d92437" FOREIGN KEY ("votingSystemId") REFERENCES "voting_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voting_system_option" ADD CONSTRAINT "FK_0017e963875bbe7cf64b7724024" FOREIGN KEY ("votingSystemId") REFERENCES "voting_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voting_system_option" DROP CONSTRAINT "FK_0017e963875bbe7cf64b7724024"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_f15632210ba03e6fb3178d92437"`);
        await queryRunner.query(`DROP TABLE "voting_system_option"`);
        await queryRunner.query(`DROP TABLE "voting_system"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
