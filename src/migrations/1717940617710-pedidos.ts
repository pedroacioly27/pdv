import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Pedidos1717940617710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'orders',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'client_id', type: 'integer' },
                { name: 'observation', type: 'text', isNullable: true },
                { name: 'value', type: 'integer' }
            ]
        })

        await queryRunner.createTable(table)

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['client_id'],
            referencedTableName: 'clients',
            referencedColumnNames: ['id']
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders')
    }

}
