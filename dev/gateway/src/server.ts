import fastifyCookie from '@fastify/cookie';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import Fastify from 'fastify';
import path, { join } from 'path';
import { Config } from './config';

console.info('Gateway server is running');

// fastify setup
const app = Fastify({ logger: true });
app.register(fastifyCookie);

// error handler
app.setErrorHandler(function (error, request, reply) {
  app.log.error(error);
  app.log.error(request);
  reply.status(409).send(error);
});

const schema = loadSchemaSync(join(path.resolve(), './src/graphql/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
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
