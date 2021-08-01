import { LoggerMiddleware } from '@features/common/services/logger/logger-middleware/logger.middleware';
import {
  CLS_NAMESPACE,
  WINSTON_LOGGER,
} from '@features/common/services/logger/logger.const';
import { WinstonLoggerService } from '@features/common/services/logger/winston-logger/winston-logger.service';
import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import cls from 'cls-hooked';
import winston from 'winston';

@Module({
  imports: [],
  providers: [
    {
      provide: CLS_NAMESPACE,
      useValue: cls.createNamespace('app'),
    },
    {
      provide: WINSTON_LOGGER,
      useValue: winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [new winston.transports.Console()],
      }),
    },
    LoggerMiddleware,
    WinstonLoggerService,
    PrismaService,
  ],
  exports: [
    WinstonLoggerService,
    PrismaService,
    LoggerMiddleware,
    CLS_NAMESPACE,
  ],
})
export class CommonModule {}
