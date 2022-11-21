import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';

import dataSource from './data-source';

@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: () => dataSource.initialize(),
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
