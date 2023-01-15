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
r2 = sub, obj, act, eft

[policy_definition]
p = sub, tenant, obj, act, eft
p2 = sub, obj, act, eft

[role_definition]
g = _, _, _
g2 = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))
e2 = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub, r.tenant) && keyMatch2(r.obj, p.obj) && r.act == p.act && r.tenant == p.tenant
m2 = g2(r2.sub, p2.sub) && keyMatch2(r2.obj, p2.obj) && r2.act == p2.act
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
