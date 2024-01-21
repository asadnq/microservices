import { Module } from '@nestjs/common';
import { BookCatalogDBService } from './book-catalog-db.service';

@Module({
  controllers: [],
  providers: [BookCatalogDBService],
  exports: [BookCatalogDBService],
})
export class BookCatalogDBModule {}
