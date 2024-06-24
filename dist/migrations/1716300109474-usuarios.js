"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios1716300109474 = void 0;
const typeorm_1 = require("typeorm");
class Usuarios1716300109474 {
    async up(queryRunner) {
        const table = new typeorm_1.Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'name', type: 'text', isNullable: true },
                { name: 'email', type: 'text', isUnique: true },
                { name: 'password', type: 'text' },
            ]
        });
        await queryRunner.createTable(table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.Usuarios1716300109474 = Usuarios1716300109474;
