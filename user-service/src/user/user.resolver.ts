import { Resolver } from '@nestjs/graphql';

import { IQuery, User } from '../../generated/graphql';
import { UserService } from './user.service';
@Resolver('User')
export class UserResolver extends IQuery {
  constructor(private readonly userService: UserService) {
    super();
  }

  async users(): Promise<User[]> {
    return [];
  }

  async user(id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
