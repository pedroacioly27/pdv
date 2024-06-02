import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Categorias1717294241247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'categories',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'description', type: 'text', isUnique: true }
            ]
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories')
    }

}
