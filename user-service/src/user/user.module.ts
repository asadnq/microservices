import { Module } from '@nestjs/common';

import { UserResolver } from '../user/user.resolver';
import { UserService } from './user.service';
import { UserDBModule } from '@microservices/user-db';

@Module({
  imports: [UserDBModule],
  providers: [UserResolver, UserService],
  exports: [UserResolver],
})
export class UserModule {}
