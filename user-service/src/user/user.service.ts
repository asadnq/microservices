import { Injectable } from '@nestjs/common';
import { UserDBService } from '@microservices/user-db';

@Injectable()
export class UserService {
  constructor(private readonly db: UserDBService) {}

  // TODO: Implement pagination and filter
  findMany() {
    return this.db.user.findMany({});
  }

  findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }
}
