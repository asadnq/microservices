import { GraphQLFederationDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const subgraphs = [
  {
    source: 'user-service/**/*.graphql',
    output: join(process.cwd(), 'user-service/generated/graphql.ts'),
  },
  {
    source: 'book-catalog-service/**/*.graphql',
    output: join(process.cwd(), 'book-catalog-service/generated/graphql.ts'),
  },
];

const definitionsFactory = new GraphQLFederationDefinitionsFactory();

subgraphs.forEach(({ source, output }) => {
  definitionsFactory.generate({
    // skipResolverArgs: true,
    typePaths: [source],
    path: output,
    outputAs: 'class',
    watch: true,
  });
});
