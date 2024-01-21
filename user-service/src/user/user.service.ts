import { Injectable } from '@nestjs/common';
import { UserDBService } from '@microservices/user-db';
import { CreateUserInput, UpdateUserInput } from '../../generated/graphql'; // Import your input types

@Injectable()
export class UserService {
  constructor(private readonly db: UserDBService) {}

  findMany() {
    return this.db.user.findMany({});
  }

  findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  create(input: CreateUserInput) {
    return this.db.user.create({
      data: {
        ...input,
      },
    });
  }

  update(id: string, input: UpdateUserInput) {
    return this.db.user.update({
      where: { id },
      data: {
        ...input,
      },
    });
  }

  delete(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
