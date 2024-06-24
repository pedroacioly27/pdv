"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clients1717343344341 = void 0;
const typeorm_1 = require("typeorm");
class Clients1717343344341 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: 'clients',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'name', type: 'text' },
                { name: 'email', type: 'text', isUnique: true },
                { name: 'cpf', type: 'text', isUnique: true },
                { name: 'cep', type: 'text' }
            ]
        });
        await queryRunner.createTable(table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('clients');
    }
}
exports.Clients1717343344341 = Clients1717343344341;
