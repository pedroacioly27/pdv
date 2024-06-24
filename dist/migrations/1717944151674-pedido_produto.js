"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoProduto1717944151674 = void 0;
const typeorm_1 = require("typeorm");
class PedidoProduto1717944151674 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: 'order_product',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'order_id', type: 'integer' },
                { name: 'product_id', type: 'integer' },
                { name: 'amount_product', type: 'integer' },
                { name: 'value_product', type: 'integer' }
            ]
        });
        await queryRunner.createTable(table);
        await queryRunner.createForeignKeys('order_product', [
            new typeorm_1.TableForeignKey({
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id']
            }),
            new typeorm_1.TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id']
            })
        ]);
    }
    async down(queryRunner) {
    }
}
exports.PedidoProduto1717944151674 = PedidoProduto1717944151674;
