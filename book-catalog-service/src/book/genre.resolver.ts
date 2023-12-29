import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  Genre,
  CreateGenreInput,
  UpdateGenreInput,
  Book,
} from '../../generated/graphql';
import { GenreService } from './genre.service';
import { BookService } from './book.service';

@Resolver('Genre')
export class GenreResolver {
  constructor(
    private readonly genreService: GenreService,
    private readonly bookService: BookService
  ) {}

  @Query(() => Genre)
  async genre(@Args('id', { type: () => ID }) id: string) {
    return this.genreService.getGenre(id);
  }

  @Query(() => [Genre])
  async genres() {
    return this.genreService.getAllGenres();
  }

  @Mutation(() => Genre)
  async createGenre(@Args('input') input: CreateGenreInput) {
    return this.genreService.createGenre(input);
  }

  @Mutation(() => Genre)
  async updateGenre(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateGenreInput
  ) {
    return this.genreService.updateGenre(id, input);
  }

  @Mutation(() => Genre)
  async deleteGenre(@Args('id', { type: () => ID }) id: string) {
    return this.genreService.deleteGenre(id);
  }

  @ResolveField(() => [Book], { name: 'books' })
  async books(@Parent() genre: Genre) {
    return this.bookService.forGenre(genre);
  }
}
