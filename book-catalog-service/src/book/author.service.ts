import { Injectable } from '@nestjs/common';
import { BookCatalogDBService } from '@microservices/book-catalog-db';
import {
  Book,
  CreateAuthorInput,
  UpdateAuthorInput,
} from '../../generated/graphql'; // Import your input types

@Injectable()
export class AuthorService {
  constructor(private readonly db: BookCatalogDBService) {}

  async getAuthor(id: string) {
    return await this.db.author.findUnique({
      where: { id },
    });
  }

  async getAllAuthors() {
    return this.db.author.findMany();
  }

  async createAuthor(input: CreateAuthorInput) {
    const { bookIds, ...author } = input;
    return this.db.author.create({ data: author });
  }

  async updateAuthor(id: string, input: UpdateAuthorInput) {
    const { bookIds, ...author } = input;
    return this.db.author.update({
      where: { id },
      data: {
        ...author,
        ...(bookIds && bookIds.length > 0
          ? {
              books: {
                connect: bookIds.map((bookId) => ({ id: bookId })),
              },
            }
          : {}),
      },
    });
  }

  async deleteAuthor(id: string) {
    return this.db.author.delete({ where: { id } });
  }

  async forBook(book: Book) {
    return this.db.book
      .findUnique({
        where: {
          id: book.id,
        },
      })
      .author();
  }
}
