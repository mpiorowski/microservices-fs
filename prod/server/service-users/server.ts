import Fastify from "fastify";
import pg from "pg";
import { migrate } from "postgres-migrations";
import { Config } from "./config";

console.info("service users says hi");

// fastify setup
const app = Fastify({ logger: true });

// error handler
app.setErrorHandler(function (error, request, reply) {
  console.error("error", error);
  console.error("request", request);
  console.error("reply", reply);
});

// Declare routes

// Run the server!
const start = async () => {
  // migration
  const client = new pg.Client(Config.POSTGRES);
  await client.connect();
  try {
    await migrate({ client }, "./migrations");
    app.log.info(`Migrations ran successfully`);
  } finally {
    await client.end();
  }

  try {
    // fastify server startup
    await app.listen(Config.PORT, "0.0.0.0");
    app.log.info(`server listening on ${Config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
void start();
