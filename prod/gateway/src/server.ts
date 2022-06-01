import fastifyCookie from '@fastify/cookie';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import path, { join } from 'path';
import { Config } from './config';
import { loaders } from './loaders';
import { resolvers } from './resolvers';

console.info('Gateway server is running');

// fastify setup
const app = Fastify({ logger: true });
app.register(fastifyCookie);

// error handler
app.setErrorHandler(function (error, request, reply) {
  app.log.error('error', error);
  app.log.error('request', request);
  app.log.error('reply', reply);
});

const schema = loadSchemaSync(join(path.resolve(), './src/graphql/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// mercurius
app.register(mercurius, {
  schema,
  resolvers,
  loaders,
  graphiql: true,
});

// Run the server!
const start = async () => {
  try {
    // fastify server startup
    await app.listen(Config.PORT, '0.0.0.0');
    app.log.info(`server listening on ${Config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
void start();
