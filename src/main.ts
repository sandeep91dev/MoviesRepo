import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserExceptionFilter } from 'src/utils/exception-filters/user.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
}
bootstrap();
