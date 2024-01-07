import { Module } from '@nestjs/common';

import { UserResolver } from '../user/user.resolver';
import { UserService } from './user.service';
import { UserDBModule } from '@microservices/user-db';
import { ShelfService } from '../shelf/shelf.service';

@Module({
  imports: [UserDBModule],
  providers: [UserResolver, UserService, ShelfService],
  exports: [UserService],
})
export class UserModule {}
