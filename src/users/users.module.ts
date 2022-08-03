import { CustomLoggerModule } from './../custom-logger/custom-logger.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  exports:[UsersService],
  controllers: [UsersController],
  providers: [UsersService],
  imports: [CustomLoggerModule]
})
export class UsersModule {}
