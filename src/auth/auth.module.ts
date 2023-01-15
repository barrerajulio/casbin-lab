import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [PermissionModule.forRoot()],
  controllers: [AuthController],
})
export class AuthModule {}
