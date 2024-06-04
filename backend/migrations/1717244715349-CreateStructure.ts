import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStructure1717244715349 implements MigrationInterface {
    name = 'CreateStructure1717244715349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annonce\` DROP FOREIGN KEY \`FK_af7409f602a5b1cd64c2960afc1\``);
        await queryRunner.query(`ALTER TABLE \`categorie\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categorie\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annonce\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`annonce\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annonce\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`annonce\` ADD \`location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annonce\` ADD CONSTRAINT \`FK_af7409f602a5b1cd64c2960afc1\` FOREIGN KEY (\`categorieId\`) REFERENCES \`categorie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annonce\` DROP FOREIGN KEY \`FK_af7409f602a5b1cd64c2960afc1\``);
        await queryRunner.query(`ALTER TABLE \`annonce\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`annonce\` ADD \`location\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annonce\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`annonce\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categorie\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categorie\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annonce\` ADD CONSTRAINT \`FK_af7409f602a5b1cd64c2960afc1\` FOREIGN KEY (\`categorieId\`) REFERENCES \`goodcorner\`.\`categorie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
