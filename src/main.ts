import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServer = app.get(ConfigService);
  const PORT = configServer.get('port');
  await app.listen(PORT);
}
bootstrap();
