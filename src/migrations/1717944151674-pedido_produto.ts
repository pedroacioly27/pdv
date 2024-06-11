import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PedidoProduto1717944151674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'order_product',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'order_id', type: 'integer' },
                { name: 'product_id', type: 'integer' },
                { name: 'amount_product', type: 'integer' },
                { name: 'value_product', type: 'integer' }
            ]
        })

        await queryRunner.createTable(table)

        await queryRunner.createForeignKeys('order_product', [
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id']
            }),
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id']
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
