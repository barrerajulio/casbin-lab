## PBAC
- https://www.sine.co/blog/policy-based-access-control-pbac/
- https://go.plainid.com/en/policy-based-access-control-explained
- https://www.skyflow.com/post/introducing-the-skyflow-data-governance-engine
- https://axiomatics.com/resources/reference-library/policy-based-access-control-pbac

## Documentación
- https://casbin.org/docs/en/api-overview
- https://casbin.org/docs/en/middlewares
- https://casbin.org/docs/en/benchmark
- https://casbin.org/docs/en/supported-models
- https://casbin.org/docs/en/policy-storage
- https://casbin.org/docs/en/adapters

## Articulos
- https://articles.wesionary.team/understanding-casbin-with-different-access-control-model-configurations-faebc60f6da5
- https://medium.com/silo-blog/designing-a-flexible-permissions-system-with-casbin-f5d97fef17b8
- https://ridouku.medium.com/casbin-an-alternative-to-validate-user-permissions-fd21fadc2b3a
- https://medium.com/teamzerolabs/rbac-vs-abac-in-node-js-backend-321a426faae2
- https://www.nearform.com/blog/access-control-node-js-fastify-and-casbin/

## Editor

https://casbin.org/en/editor

## Librerias nestjs

https://github.com/node-casbin/typeorm-adapter/blob/master/README.md
https://github.com/juicycleff/nestjs-casbin/blob/master/src/lib/nest-casbin.service.ts


## Librerias otras
- https://npm.io/package/@casl/ability
- https://npm.io/package/casbin-pg-adapter
- https://npm.io/package/typeorm-adapter
- https://npm.io/package/react-abac

## No tomadas en cuenta
- https://github.com/ZenitechSoftware/visa-js#readme
- https://github.com/onury/accesscontrol/
- https://onury.io/accesscontrol/?api=ac#AccessControl~Query#resource
- https://casl.js.org/v6/en/advanced/typescript
- https://github.com/nearform/udaru
- https://www.npmjs.com/package/pbac
- https://www.openpolicyagent.org/docs/latest/cli/
- https://pongzt.com/post/opa-nodejs/

## Ideas Policy generator
- https://docs.aws.amazon.com/IAM/latest/UserGuide/access_controlling.html
- https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws-dates.html


## Snippet
```ts
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
```
