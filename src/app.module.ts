import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import dataSource from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, PermissionModule.forRoot(), PostModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DataSource,
      useFactory: () => dataSource.initialize(),
    },
  ],
})
export class AppModule {}
