import { Module } from '@nestjs/common';
import { ComplaintsModule } from './complaints/complaints.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseProvider } from './database/database.providers';

@Module({
  imports: [DatabaseProvider, ComplaintsModule, AuthModule],
})
export class AppModule {}
