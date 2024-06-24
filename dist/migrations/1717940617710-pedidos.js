"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedidos1717940617710 = void 0;
const typeorm_1 = require("typeorm");
class Pedidos1717940617710 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: 'orders',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'client_id', type: 'integer' },
                { name: 'observation', type: 'text', isNullable: true },
                { name: 'value', type: 'integer' }
            ]
        });
        await queryRunner.createTable(table);
        await queryRunner.createForeignKey('orders', new typeorm_1.TableForeignKey({
            columnNames: ['client_id'],
            referencedTableName: 'clients',
            referencedColumnNames: ['id']
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('orders');
    }
}
exports.Pedidos1717940617710 = Pedidos1717940617710;
