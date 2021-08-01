import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from '@config/configuration.model';
import { WinstonLoggerService } from '@features/common/services/logger/winston-logger/winston-logger.service';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WinstonLoggerService));

  // Validation
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const configService: ConfigService<ConfigurationVariables> =
    app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const corsConfig = configService.get<CorsConfig>('cors');
  const nestConfig = configService.get<NestConfig>('nest');
  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors({
      credentials: true,
      origin: corsConfig.origins,
    });
  }
  await app.listen(nestConfig.port);
}
bootstrap();
