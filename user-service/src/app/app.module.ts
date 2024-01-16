import { join } from 'path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserDBModule } from '@microservices/user-db';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from '../user/user.resolver';
import { UserModule } from '../user/user.module';
import { ShelfModule } from '../shelf/shelf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      typePaths: ['user-service/**/*.graphql'],
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      definitions: {
        path: join(process.cwd(), 'user-service/generated/graphql.ts'),
        outputAs: 'class',
        skipResolverArgs: false,
      },
    }),
    // Database
    UserDBModule,
    // Entities
    UserModule,
    ShelfModule,
  ],
  providers: [UserResolver, ShelfModule],
})
export class AppModule {}
