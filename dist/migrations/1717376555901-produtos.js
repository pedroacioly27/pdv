"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produtos1717376555901 = void 0;
const typeorm_1 = require("typeorm");
class Produtos1717376555901 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: 'products',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'description', type: 'text' },
                { name: 'amount', type: 'integer' },
                { name: 'value', type: 'integer' },
                { name: 'categorie_id', type: 'integer' }
            ]
        });
        await queryRunner.createTable(table);
        await queryRunner.createForeignKey('products', new typeorm_1.TableForeignKey({
            columnNames: ['categorie_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id']
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('products');
    }
}
exports.Produtos1717376555901 = Produtos1717376555901;
