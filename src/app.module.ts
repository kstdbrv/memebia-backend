import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ConfigurationVariables,
  GraphqlConfig,
} from '@config/configuration.model';
import { AuthModule } from '@features/auth/auth.module';
import { UserModule } from '@features/users/user.module';
import { CommonModule } from '@features/common/common.module';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationExceptionFilter } from '@features/common/filters/application-exception/application-exception.filter';
import { LoggerMiddleware } from '@features/common/services/logger/logger-middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<ConfigurationVariables>,
      ) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
