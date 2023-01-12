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
            newEnforcer(
              `
[request_definition]
r = sub, tenant, obj, act, eft

[policy_definition]
p = sub, tenant, obj, act, eft

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub, r.tenant) && keyMatch2(r.obj, p.obj) && r.act == p.act && r.tenant == p.tenant
`,
              adapter,
            ),
          inject: ['PERMISSION_ADAPTER'],
        },
      ],
      exports: ['PERMISSION_ENFORCER'],
    };
  }
}
