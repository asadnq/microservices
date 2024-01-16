import {
  Args,
  Mutation,
  Resolver,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { ShelfService } from './shelf.service';
import {
  Book,
  CreateShelfInput,
  Shelf,
  UpdateShelfBooksInput,
  UpdateShelfInput,
} from '../../generated/graphql';

@Resolver('Shelf')
export class ShelfResolver {
  constructor(
    private readonly userService: UserService,
    private readonly shelfService: ShelfService
  ) {}

  @ResolveField(() => [Book], { name: 'books' })
  books(@Parent() shelf: Shelf) {
    return shelf.books.map((bookId) => ({
      __typename: 'Book',
      id: bookId,
    }));
  }

  @Mutation(() => Shelf, { name: 'createShelf' })
  create(@Args('input') input: CreateShelfInput) {
    return this.shelfService.create(input);
  }

  @Mutation(() => Shelf, { name: 'updateShelf' })
  update(@Args('input') input: UpdateShelfInput) {
    return this.shelfService.update(input);
  }

  @Mutation(() => Shelf, { name: 'addBooksToShelf' })
  addBooks(@Args('input') input: UpdateShelfBooksInput) {
    return this.shelfService.addBooks(input);
  }

  @Mutation(() => Shelf, { name: 'removeBooksFromShelf' })
  removeBooks(@Args('input') input: UpdateShelfBooksInput) {
    return this.shelfService.removeBooks(input);
  }

  @Mutation(() => Shelf, { name: 'deleteShelf' })
  delete(@Args('id', { type: () => ID }) id) {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
