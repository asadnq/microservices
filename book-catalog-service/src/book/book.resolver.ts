import { Resolver } from '@nestjs/graphql';

import { IQuery, User } from '../../generated/graphql';

@Resolver('User')
export class UserResolver extends IQuery {
  async users(): Promise<User[]> {
    return [];
  }
}

