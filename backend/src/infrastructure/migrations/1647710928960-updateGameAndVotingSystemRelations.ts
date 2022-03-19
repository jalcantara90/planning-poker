import {MigrationInterface, QueryRunner} from "typeorm";

export class updateGameAndVotingSystemRelations1647710928960 implements MigrationInterface {
    name = 'updateGameAndVotingSystemRelations1647710928960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_f15632210ba03e6fb3178d92437"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "REL_f15632210ba03e6fb3178d9243"`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_f15632210ba03e6fb3178d92437" FOREIGN KEY ("votingSystemId") REFERENCES "voting_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_f15632210ba03e6fb3178d92437"`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "REL_f15632210ba03e6fb3178d9243" UNIQUE ("votingSystemId")`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_f15632210ba03e6fb3178d92437" FOREIGN KEY ("votingSystemId") REFERENCES "voting_system"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
