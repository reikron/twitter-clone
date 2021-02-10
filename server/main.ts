import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

const DIST = 'twitter-clone';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //logger: ['error', 'warn'],
  });
  const env = process.env.NODE_ENV || "production";
  const port = parseInt(process.env.PORT || '3000');

  app.set('env', env);
  app.set('port', port);
  app.disable('x-powered-by');

  if (env == "production") {
    app.useStaticAssets(join(__dirname, '..', DIST));
    app.setViewEngine('html');
    app.use((req, res, next) => {
      if (req.url.startsWith('/api/')) {
        next();
      } else {
        return res.status(200).sendFile('/', { root: join(__dirname, '..', DIST) });
      }
    });
  }

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
    }),
  );

  await app.listen(port);
}

bootstrap();