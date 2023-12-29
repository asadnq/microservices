// book.service.ts
import { Injectable } from '@nestjs/common';
import { BookCatalogDBService } from '@microservices/book-catalog-db';
import {
  Author,
  CreateBookInput,
  Genre,
  UpdateBookInput,
} from '../../generated/graphql';

@Injectable()
export class BookService {
  constructor(private readonly db: BookCatalogDBService) {}

  async getBook(id: string) {
    return this.db.book.findUnique({
      where: { id },
    });
  }

  async getAllBooks() {
    return this.db.book.findMany();
  }

  async createBook(input: CreateBookInput) {
    const { authorId, genreIds, ...bookData } = input;
    return this.db.book.create({
      data: {
        ...bookData,
        author: {
          connect: {
            id: authorId,
          },
        },
        bookGenre: {
          createMany: {
            data: genreIds.map((genreId) => ({ genreId })),
          },
        },
      },
    });
  }

  async updateBook(id: string, input: UpdateBookInput) {
    const { authorId, genreIds, ...bookData } = input;

    return this.db.book.update({
      where: { id },
      data: {
        ...bookData,
        ...(authorId
          ? {
              author: {
                connect: { id: authorId },
              },
            }
          : {}),
        ...(genreIds && genreIds.length > 0
          ? {
              bookGenre: {
                deleteMany: {},
                create: genreIds.map((genreId) => ({
                  genreId,
                })),
              },
            }
          : {}),
      },
    });
  }

  async deleteBook(id: string) {
    return this.db.book.delete({ where: { id } });
  }

  async forAuthor(author: Author) {
    return this.db.author.findUnique({ where: { id: author.id } }).books();
  }

  async forGenre(genre: Genre) {
    const book = await this.db.genre.findUnique({
      where: { id: genre.id },
      include: {
        bookGenre: {
          include: {
            book: true,
          },
        },
      },
    });

    return book.bookGenre.map(({ book }) => ({ ...book }));
  }
}
