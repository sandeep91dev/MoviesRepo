import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MvloggingService} from 'src/utils/mvlogging/mvlogging.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });
  //app.useGlobalFilters(new ExceptionFilter());
  app.useLogger(new MvloggingService());
  await app.listen(3000);
}
bootstrap();
