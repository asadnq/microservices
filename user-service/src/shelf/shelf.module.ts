import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfResolver } from './shelf.resolver';
import { UserService } from '../user/user.service';
import { UserDBModule } from '@microservices/user-db';

@Module({
  imports: [UserDBModule],
  providers: [ShelfService, ShelfResolver, UserService],
  exports: [ShelfService],
})
export class ShelfModule {}
