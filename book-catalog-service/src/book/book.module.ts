import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { GenreService } from './genre.service';
import { BookCatalogDBService } from '@microservices/book-catalog-db';
import { GenreResolver } from './genre.resolver';

@Module({
  imports: [],
  providers: [
    AuthorService,
    AuthorResolver,
    BookResolver,
    BookService,
    GenreService,
    GenreResolver,
    BookCatalogDBService,
  ],
})
export class BookModule {}
