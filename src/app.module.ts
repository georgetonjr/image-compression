import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SaveImageModule } from './module/save-image/save-image.module';
import { DatabaseModule } from './infra/database.module';

@Module({
  imports: [ConfigModule.forRoot(), SaveImageModule, DatabaseModule],
})
export class AppModule {}
