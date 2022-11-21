import TypeORMAdapter from 'typeorm-adapter';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { newEnforcer } from 'casbin';

import { CasbinRuleEntity } from 'src/entities/casbin-rule.entity';
import { PermissionController } from './permission.controller';

@Module({
  controllers: [PermissionController],
})
export class PermissionModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: PermissionModule,
      imports: [DatabaseModule],
      providers: [
        {
          provide: 'PERMISSION_ADAPTER',
          useFactory: (dataSource: DataSource) =>
            TypeORMAdapter.newAdapter(
              {
                connection: dataSource,
              },
              {
                customCasbinRuleEntity: CasbinRuleEntity,
              },
            ),
          inject: [DataSource],
        },
        {
          provide: 'PERMISSION_ENFORCER',
          useFactory: (adapter: TypeORMAdapter) =>
            newEnforcer('./model.conf', adapter),
          inject: ['PERMISSION_ADAPTER'],
        },
      ],
      exports: ['PERMISSION_ENFORCER'],
    };
  }
}
