import { Injectable } from '@nestjs/common';
import { BookCatalogDBService } from '@microservices/book-catalog-db';
import {
  Book,
  CreateGenreInput,
  UpdateGenreInput,
} from '../../generated/graphql'; // Import your input types

@Injectable()
export class GenreService {
  constructor(private readonly db: BookCatalogDBService) {}

  async getGenre(id: string) {
    return this.db.genre.findUnique({ where: { id } });
  }

  async getAllGenres() {
    return this.db.genre.findMany();
  }

  async createGenre(input: CreateGenreInput) {
    return this.db.genre.create({ data: input });
  }

  async updateGenre(id: string, input: UpdateGenreInput) {
    return this.db.genre.update({ where: { id }, data: input });
  }

  async deleteGenre(id: string) {
    return this.db.genre.delete({ where: { id } });
  }

  async forBook(book: Book) {
    const bookGenres = await this.db.book.findUnique({
      where: { id: book.id },
      include: {
        bookGenre: {
          include: {
            genre: true,
          },
        },
      },
    });

    return bookGenres.bookGenre.map((b) => ({ ...b.genre }));
  }
}
