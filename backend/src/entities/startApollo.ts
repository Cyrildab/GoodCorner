import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { annonceResolvers } from "../graphql-resolvers/annonceResolvrs";
import { dataSource } from "../db";
import { categorieResolvers } from "../graphql-resolvers/categorieResolvers";
import { AdMutations } from "../graphql-resolvers/annonceMutation";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

async function startApolloServer() {
  const schema = await buildSchema({
    resolvers: [annonceResolvers, categorieResolvers, AdMutations],
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startApolloServer();
