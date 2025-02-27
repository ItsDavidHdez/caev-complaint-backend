import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://caev-complaint-frontend-wnzk.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(
    `🚀 Servidor corriendo en el puerto ${process.env.PORT || 3000}!`,
  );
}

bootstrap();
