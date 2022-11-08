import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('App');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const PORT = process.env.PORT;
  await app.listen(PORT);
  logger.log(`App listening on http://localhost:${PORT}`);
}
bootstrap();
