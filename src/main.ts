import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //  create Nest application instance and set enable CORS with fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { cors: true, logger: ['debug', 'error', 'log', 'verbose', 'warn'] },
  );
  // use global validation pipe to validate all incoming request payloads and remove unknown properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

  // create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  // set Swagger document
  SwaggerModule.setup('api', app, document);

  // start Nest application
  await app.listen(3000);
}

// start Nest application
bootstrap();
