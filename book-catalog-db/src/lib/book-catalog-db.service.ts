import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './generated';

@Injectable()
export class BookCatalogDBService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
