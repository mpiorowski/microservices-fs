import Fastify from 'fastify';
import pg from 'pg';
import { migrate } from 'postgres-migrations';
import { Config } from './config';
import { messagesService } from './services/messages.service';

console.info('Messages server is running');

// fastify setup
const app = Fastify({ logger: true });

// error handler
app.setErrorHandler(function (error, request, reply) {
  app.log.error(error);
  app.log.error(request);
  reply.status(409).send(error);
});

// Declare routes
messagesService(app);

// Run the server!
const start = async () => {
  const client = new pg.Client(Config.POSTGRES);
  try {
    // migration
    await client.connect();
    await migrate({ client }, './migrations');
    app.log.info(`Migrations ran successfully`);
  } finally {
    await client.end();
  }

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
