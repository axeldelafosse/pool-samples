import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';

// import bodyParser from 'body-parser';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // bodyParser: false,

  // Register body parser before nest stack
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());

  // Validate requests body before executing the handler
  app.useGlobalPipes(new ValidationPipe());

  app.use(compression());
  // Start express server
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
