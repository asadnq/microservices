import { join } from 'path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { BookResolver } from '../book/book.resolver';
import { BookCatalogDBModule } from '@microservices/book-catalog-db';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      definitions: {
        path: join(process.cwd(), 'user-service/generated/graphql.ts'),
        outputAs: 'class',
        skipResolverArgs: false,
      },
    }),
    // Database
    BookCatalogDBModule,
  ],
  providers: [BookResolver],
})
export class AppModule {}
