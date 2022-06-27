import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MvloggingService} from 'src/utils/mvlogging/mvlogging.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });
  //app.useGlobalFilters(new ExceptionFilter());
  app.useLogger(new MvloggingService());
  const config = new DocumentBuilder()
    .setTitle('Films API')
    .setDescription('Create users and films then rate and review films')
    .setVersion('1.0')
    .addTag('films')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
