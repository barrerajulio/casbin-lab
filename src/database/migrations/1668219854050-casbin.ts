import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class casbin1668219854050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'casbin_rule',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'ptype',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'v0',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'v1',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'v2',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'v3',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'v4',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'v5',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'v6',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('casbin_rule');
    }

}
