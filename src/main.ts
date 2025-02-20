import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(
    '🔍 MONGO_URI en Railway después de dotenv:',
    process.env.MONGO_URI,
  );

  if (!process.env.MONGO_URI) {
    console.error('❌ ERROR: MONGO_URI no está definido en Railway');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Servidor corriendo en Railway`);
}
bootstrap();
