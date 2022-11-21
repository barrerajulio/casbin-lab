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
    @Body() { action, resourceId }: PermissionDto,
  ): Promise<void> {
    const policy = await this.enforcer.addPolicy(
      '01c1304e-1eef-42c8-bbd3-d3ed2c5b90f6',
      resourceId,
      action,
    );
    console.log(
      '🚀 ~ file: permission.controller.ts ~ line 30 ~ PermissionController ~ policy',
      policy,
    );
    await this.enforcer.savePolicy();
  }
}
