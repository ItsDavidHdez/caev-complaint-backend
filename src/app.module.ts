import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsModule } from './complaints/complaints.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://admin:admin1234@complaints-db.q3bw0.mongodb.net/?retryWrites=true&w=majority&appName=complaints-db',
    ),
    ComplaintsModule,
    AuthModule,
  ],
})
export class AppModule {}
