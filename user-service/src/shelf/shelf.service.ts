import { UserDBService } from '@microservices/user-db';
import { Injectable } from '@nestjs/common';
import { User } from '../../generated/graphql';

@Injectable()
export class ShelfService {
  constructor(private readonly db: UserDBService) {}

  async forUser(user: User) {
    return this.db.user.findUnique({ where: { id: user.id } }).shelves();
  }
}
