import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Clients1717343344341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'clients',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'name', type: 'text' },
                { name: 'email', type: 'text', isUnique: true },
                { name: 'cpf', type: 'text', isUnique: true },
                { name: 'cep', type: 'text' }
            ]
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients')
    }

}
