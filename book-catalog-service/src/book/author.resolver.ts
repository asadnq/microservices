import {
  Author,
  CreateAuthorInput,
  UpdateAuthorInput,
} from '../../generated/graphql';

// book.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { AuthorService } from './author.service';
import { GenreService } from './genre.service';

@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.authorService.getAuthor(reference.id);
  }

  @ResolveField('books')
  async books(@Parent() author: Author) {
    return this.bookService.forAuthor(author);
  }

  @Query(() => Author)
  async author(@Args('id', { type: () => ID }) id: string) {
    return this.authorService.getAuthor(id);
  }

  @Query(() => [Author])
  async authors() {
    return this.authorService.getAllAuthors();
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput) {
    return this.authorService.createAuthor(input);
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAuthorInput
  ) {
    return this.authorService.updateAuthor(id, input);
  }

  @Mutation(() => Author)
  async deleteAuthor(@Args('id', { type: () => ID }) id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
