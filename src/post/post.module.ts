import { Module } from '@nestjs/common';

import { PermissionModule } from 'src/permission/permission.module';
import { PostController } from './post.controller';

@Module({
  imports: [PermissionModule.forRoot()],
  controllers: [PostController],
})
export class PostModule {}
