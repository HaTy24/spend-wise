import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  // app.setGlobalPrefix('/v1/api')

  if (process.env.ENABLE_CORS === 'true') {
    app.enableCors({
      origin: '*',
      methods: '*',
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger config.
  const enableSwagger = process.env.ENABLE_SWAGGER === 'true';
  if (enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle('Backend APIs')
      .setDescription('All backend APIs for the product.')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', in: 'header' })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };
    SwaggerModule.setup('docs', app, document, customOptions);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
