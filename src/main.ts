import 'dotenv/config'; // Carga automáticamente el .env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🔍 MONGO_URI en Railway:', process.env.MONGO_URI);

  if (!process.env.MONGO_URI) {
    console.error('❌ ERROR: MONGO_URI no está definido en Railway');
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
