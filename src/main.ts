import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import MongoStore from 'connect-mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    session({
      secret: 'food-delivery',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        maxAge: 6 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 3600000),
      },
      store: new MongoStore({ mongoUrl: process.env.DATABASE_URI }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
