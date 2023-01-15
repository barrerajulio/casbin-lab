import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { Enforcer } from 'casbin';

import { PermissionDto } from './permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject('PERMISSION_ENFORCER') private readonly enforcer: Enforcer,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async addPermission(
    @Body() { action, resourceId, effect }: PermissionDto,
  ): Promise<void> {
    console.log(
      '🚀 ~ file: permission.controller.ts ~ line 30 ~ PermissionController ~ action',
      action,
    );
    const hasNamedPolicy = await this.enforcer.hasNamedPolicy(
      'p2',
      '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
      resourceId,
      action,
      effect === 'allow' ? 'deny' : 'allow',
    );
    if (hasNamedPolicy) {
      await this.enforcer.removeNamedPolicy(
        'p2',
        '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
        resourceId,
        action,
        effect === 'allow' ? 'deny' : 'allow',
      );
    }
    const policy = await this.enforcer.addNamedPolicy(
      'p2',
      '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
      resourceId,
      action,
      effect,
    );
    console.log(
      '🚀 ~ file: permission.controller.ts ~ line 30 ~ PermissionController ~ policy',
      policy,
    );
    // await this.enforcer.savePolicy();
  }
}
