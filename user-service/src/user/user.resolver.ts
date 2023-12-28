import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateUserInput,
  UpdateUserInput,
  IMutation,
  IQuery,
  User,
} from '../../generated/graphql';
import { UserService } from './user.service';
@Resolver('User')
export class UserResolver implements IQuery, IMutation {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findMany();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput
  ): User | Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
