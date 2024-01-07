import { join } from 'path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { BookCatalogDBModule } from '@microservices/book-catalog-db';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
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
    BookModule,
  ],
  providers: [],
})
export class AppModule {}
