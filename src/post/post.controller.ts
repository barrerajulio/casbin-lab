import {
  Controller,
  Get,
  Inject,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { Enforcer } from 'casbin';

@Controller('posts')
export class PostController {
  constructor(
    @Inject('PERMISSION_ENFORCER') private readonly enforcer: Enforcer,
  ) {}

  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    const permissions = await this.enforcer.getPermissionsForUser(
      '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
    );
    console.log(
      '🚀 ~ file: post.controller.ts ~ line 19 ~ PostController ~ getPost ~ permissions',
      permissions,
    );
    const [result] = await this.enforcer.enforceEx(
      '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
      postId,
      'read',
    );
    console.log(
      '🚀 ~ file: post.controller.ts ~ line 17 ~ PostController ~ getPost ~ result',
      result,
    );
    if (!result) {
      throw new UnauthorizedException();
    }
  }
}
