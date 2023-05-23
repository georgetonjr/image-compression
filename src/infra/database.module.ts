import { Module } from '@nestjs/common';
import { OrmModule } from './database/orm/orm.module';

@Module({
  imports: [OrmModule],
  exports: [OrmModule],
})
export class DatabaseModule {}
