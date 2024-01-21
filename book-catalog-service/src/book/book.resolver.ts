import {
  Book,
  Author,
  Genre,
  CreateBookInput,
  UpdateBookInput,
} from '../../generated/graphql';

// book.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveReference,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { AuthorService } from './author.service';
import { GenreService } from './genre.service';

@Resolver('Book')
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.bookService.getBook(reference.id);
  }

  @Query(() => Book)
  async book(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.getBook(id);
  }

  @Query(() => [Book])
  async books() {
    return this.bookService.getAllBooks();
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.createBook(input);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateBookInput
  ) {
    return this.bookService.updateBook(id, input);
  }

  @Mutation(() => Book)
  async deleteBook(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.deleteBook(id);
  }

  @ResolveField(() => Author, { name: 'author' })
  async author(@Parent() book: Book) {
    return this.authorService.forBook(book);
  }

  @ResolveField(() => [Genre], { name: 'genres' })
  async genres(@Parent() book: Book) {
    return this.genreService.forBook(book);
  }
}
