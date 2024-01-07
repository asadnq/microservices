import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  CreateUserInput,
  Shelf,
  UpdateUserInput,
  User,
} from '../../generated/graphql';
import { UserService } from './user.service';
import { ShelfService } from '../shelf/shelf.service';
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly shelfService: ShelfService
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findMany();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @ResolveField(() => [Shelf])
  async shelves(@Parent() user: User) {
    return this.shelfService.forUser(user);
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
