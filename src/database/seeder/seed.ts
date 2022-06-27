import { NestFactory } from '@nestjs/core';
import { MvloggingService } from 'src/utils/mvlogging/mvlogging.service';
import {SeederModule} from './seeder.module'
import { SeederService } from './seeder.service';


async function bootstrap() {
    let seedIn = process.argv.slice(2);
    console.log("Seeder", seedIn);

    NestFactory.createApplicationContext(SeederModule)
      .then(async appContext => {
        const logger = await appContext.resolve(MvloggingService);
        const seeder = appContext.get(SeederService);
        seeder
          .seed(seedIn[0])
          .then(() => {
            logger.debug('Seeding complete!');
          })
          .catch(error => {
            logger.error('Seeding failed!');
            throw error;
          })
          .finally(() => appContext.close());
      })
      .catch(error => {
        throw error;
      });
  }
  bootstrap();