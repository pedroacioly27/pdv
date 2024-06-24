"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorias1717294241247 = void 0;
const typeorm_1 = require("typeorm");
class Categorias1717294241247 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: 'categories',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'description', type: 'text', isUnique: true }
            ]
        });
        await queryRunner.createTable(table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('categories');
    }
}
exports.Categorias1717294241247 = Categorias1717294241247;
