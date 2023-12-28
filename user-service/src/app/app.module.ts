import { join } from 'path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserDBModule } from '@microservices/user-db';
import { ConfigModule } from '@nestjs/config';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
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
    // UserModule,
  ],
  providers: [UserResolver, UserService],
})
export class AppModule {}
