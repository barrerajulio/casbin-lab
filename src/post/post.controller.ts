import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { EnforceContext, Enforcer } from 'casbin';

@Controller('posts')
export class PostController {
  constructor(
    @Inject('PERMISSION_ENFORCER') private readonly enforcer: Enforcer,
  ) {}

  /**
   * Tenemos que averiguar si el usuario tiene definido alguna policy que deniega
   * o aprueba su acceso. Esto es así ya que teniendo una policy especifica está
   * podría sobreescribir el comportamiento que normalmente tendría su rol.
   *
   * Si hay una policy esta se agrega al batch de policies que se evaluarán. En
   * otro caso solo se agregan las policies basadas en el rol del usuario.
   *
   * Podemos dejar como default la policy que tiene tenant:
   * r2.sub == p2.sub && keyMatch2(r2.obj, p2.obj) && r2.act == p2.act && r2.tenant == p2.tenant
   *
   * Podriamos pasar al batch la policy considerando el caso p2, pero solo evaluar el
   * resultado cuando el policyDenied este a false.
   *
   * @param {string} postId
   * @memberof PostController
   */
  @Get(':postId')
  async getPost(@Param('postId', ParseUUIDPipe) postId: string) {
    const userId = '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6';
    const tenantId = '77382d8c-2686-49df-abed-ed6c4cdc3078';
    this.enforcer.enableLog(true);
    const hasPolicyDenied = await this.enforcer.hasNamedPolicy(
      'p2',
      userId,
      `/posts/${postId}`,
      'GET',
      'deny',
    );
    console.log(
      '🚀 ~ file: post.controller.ts:37 ~ PostController ~ getPost ~ hasPolicyDenied',
      hasPolicyDenied,
    );

    // const permissions = await this.enforcer.getPermissionsForUser(
    //   '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
    // );
    // const roles = await this.enforcer.getRolesForUserInDomain(
    //   '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
    //   '77382d8c-2686-49df-abed-ed6c4cdc3078',
    // );
    // console.log(
    //   '🚀 ~ file: post.controller.ts:59 ~ PostController ~ getPost ~ roles',
    //   roles,
    // );
    // console.log(
    //   '🚀 ~ file: post.controller.ts:55 ~ PostController ~ getPost ~ permissions',
    //   permissions,
    // );

    // const users = await this.enforcer.getUsersForRole(
    //   'admin',
    //   '77382d8c-2686-49df-abed-ed6c4cdc3078',
    // );
    // console.log(
    //   '🚀 ~ file: post.controller.ts:60 ~ PostController ~ getPost ~ users',
    //   users,
    // );
    const context = new EnforceContext('r2', 'p2', 'e', 'm2');
    const enforces: any[][] = [
      [userId, tenantId, `/posts/${postId}`, 'GET', 'allow'],
      [
        context,
        '5336ed05-cb56-4738-a2c3-aa8ce73a500b',
        `/posts/${postId}`,
        'GET',
        'allow',
      ],
      [
        context,
        '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
        `/posts/${postId}`,
        'GET',
        'allow',
      ],
    ];
    if (hasPolicyDenied) {
      enforces.push([context, userId, `/posts/${postId}`, 'GET', 'allow']);
    }
    const response = await this.enforcer.batchEnforce(enforces);
    console.log(
      '🚀 ~ file: post.controller.ts:53 ~ PostController ~ getPost ~ response',
      response,
    );
    // throw new UnauthorizedException();
  }
}
