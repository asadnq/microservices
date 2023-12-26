import { Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';

@Module({
  exports: [UserDBService],
  providers: [UserDBService],
})
export class UserDBModule {}
