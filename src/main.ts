import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI no está definida en .env');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Docentes') // Título de la API
    .setDescription('Documentación de la API para el manejo de docentes') // Descripción
    .setVersion('1.0') // Versión de la API
    .addTag('docentes') // Etiqueta para agrupar los endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta para acceder a la documentación: /api

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
