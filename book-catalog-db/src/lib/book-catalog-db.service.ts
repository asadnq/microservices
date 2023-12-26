import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './generated';

@Injectable()
export class BookCatalogDBService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
