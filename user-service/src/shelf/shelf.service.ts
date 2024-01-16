import { UserDBService } from '@microservices/user-db';
import { Injectable } from '@nestjs/common';
import {
  User,
  CreateShelfInput,
  UpdateShelfInput,
  UpdateShelfBooksInput,
} from '../../generated/graphql';
import { Shelf } from 'user-db/src/lib/generated';

@Injectable()
export class ShelfService {
  constructor(private readonly db: UserDBService) {}

  async forUser(user: User): Promise<Shelf[]> {
    const shelves = await this.db.user
      .findUnique({ where: { id: user.id } })
      .shelves({ include: { books: true } });

    return shelves.map((shelf) => {
      return {
        ...shelf,
        books: shelf.books.map((b) => b.bookId),
      };
    });
  }

  // async book(shelf: Shelf) {
  //   return this.db.shelfBook.find
  // }

  async create(input: CreateShelfInput) {
    const { userId, books, ...shelfData } = input;
    return this.db.shelf.create({
      data: {
        ...shelfData,
        userId,
        books: {
          createMany: {
            data: [
              ...books.map((id) => ({
                bookId: id,
              })),
            ],
          },
        },
      },
    });
  }

  async update(input: UpdateShelfInput) {
    return this.db.shelf.update({
      data: {
        name: input.name,
      },
      where: {
        id: input.shelfId,
      },
    });
  }

  async addBooks(input: UpdateShelfBooksInput) {
    return this.db.shelf.update({
      data: {
        books: {
          createMany: {
            data: input.books.map((bookId) => ({ bookId })),
          },
        },
      },
      where: {
        id: input.shelfId,
      },
    });
  }

  async removeBooks(input: UpdateShelfBooksInput) {
    return this.db.shelf.update({
      data: {
        books: {
          deleteMany: {
            bookId: {
              in: input.books,
            },
          },
        },
      },
      where: {
        id: input.shelfId,
      },
    });
  }

  async delete(id: string) {
    return this.db.shelf.delete({
      where: { id },
    });
  }
}
