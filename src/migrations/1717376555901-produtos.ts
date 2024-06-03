import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Produtos1717376555901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'products',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'description', type: 'text' },
                { name: 'amount', type: 'integer' },
                { name: 'value', type: 'integer' },
                { name: 'categorie_id', type: 'integer' }
            ]
        })
        await queryRunner.createTable(table)

        await queryRunner.createForeignKey('products', new TableForeignKey({
            columnNames: ['categorie_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id']
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
