import { Global, Module } from '@nestjs/common';
import { DbServiceService } from './db-service.service';

@Global()
@Module({
  providers: [DbServiceService],
  exports: [DbServiceService]
})
export class DbServiceModule {}
