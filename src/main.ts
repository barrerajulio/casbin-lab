import TypeORMAdapter from 'typeorm-adapter';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { newEnforcer } from 'casbin';
import { DataSource } from 'typeorm';
import { CasbinRuleEntity } from './entities/casbin-rule.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const adapter = await TypeORMAdapter.newAdapter(
    {
      connection: dataSource,
    },
    {
      customCasbinRuleEntity: CasbinRuleEntity,
    },
  );
  const enforcer = await newEnforcer('./model.conf', adapter);
  await enforcer.addGroupingPolicy(
    '73055042-56a5-4bda-8109-17b62591f2bb',
    'data_group',
  );
  await enforcer.addGroupingPolicy(
    '32c8a5d1-3a22-40f5-a624-ad6dce929afe',
    'data_group',
  );
  await enforcer.addPolicy('data_group', 'lorem', 'read');
  await enforcer.addPolicy('data_group', 'lorem', 'write');
  await enforcer.addPolicy('data_group', 'ipsum', 'write', 'denied');
  await enforcer.addPolicy(
    '73055042-56a5-4bda-8109-17b62591f2bb',
    'ipsum',
    'write',
  );
  await enforcer.savePolicy();
  console.log(
    '🚀 ~ file: main.ts ~ line 29 ~ bootstrap ~   await enforcer.getAllActions()',
    await enforcer.getAllActions(),
  );
  console.log(
    '🚀 ~ file: main.ts ~ line 33 ~ bootstrap ~ enforcer.getImplicitPermissionsForUser',
    await enforcer.getImplicitPermissionsForUser(
      '73055042-56a5-4bda-8109-17b62591f2bb',
    ),
  );
  /*await enforcer.loadFilteredPolicy([
    {
      ptype: 'p',
    },
    {
      ptype: 'g',
      v0: '73055042-56a5-4bda-8109-17b62591f2bb',
    },
  ]);*/
  /*await enforcer.loadFilteredPolicy([
    {
      ptype: 'p',
      v0: '73055042-56a5-4bda-8109-17b62591f2bb',
    },
    {
      ptype: 'g',
      v0: '73055042-56a5-4bda-8109-17b62591f2bb',
    },
  ]);*/
  console.log(
    '🚀 ~ file: main.ts ~ line 33 ~ bootstrap ~ enforcer.getPermissionsForUser',
    await enforcer.getPermissionsForUser(
      '73055042-56a5-4bda-8109-17b62591f2bb',
    ),
  );
  const result = await enforcer.enforceEx(
    '73055042-56a5-4bda-8109-17b62591f2bb',
    'ipsum',
    'write',
  );
  const result2 = await enforcer.enforceEx(
    '32c8a5d1-3a22-40f5-a624-ad6dce929afe',
    'ipsum',
    'write',
  );
  console.log('🚀 ~ file: main.ts ~ line 83 ~ bootstrap ~ result2', result2);
  console.log('🚀 ~ file: main.ts ~ line 23 ~ bootstrap ~ result', result);
  await app.listen(3000);
}
bootstrap();
