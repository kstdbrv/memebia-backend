import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  NestConfig,
  SwaggerConfig,
} from '@config/configuration.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<ConfigurationVariables> =
    app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
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

  await app.listen(nestConfig.port);
}
bootstrap();
