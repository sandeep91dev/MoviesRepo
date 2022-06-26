import { Module } from '@nestjs/common';
import { MvloggingService } from './mvlogging.service';

@Module({
  providers: [MvloggingService],
  exports:[MvloggingService]
})
export class MvloggingModule {}


