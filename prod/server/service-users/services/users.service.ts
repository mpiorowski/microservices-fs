import bcrypt from "bcryptjs";
import type { FastifyInstance } from "fastify";
import { insertUser, selectAllUsers, selectUserById } from "./users.db";

export const usersService = (app: FastifyInstance) => {
  app.get("/users", async (_request, reply) => {
    const users = await selectAllUsers();
    reply.send(users);
  });

  app.get("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await selectUserById(id);
    if (!user[0]) {
      reply.send(404).send({ message: "User not found" });
    }
    reply.send(user[0]);
  });

  app.post("/users", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const hashPassword = bcrypt.hashSync(password);

    const user = await insertUser(email, hashPassword);

    if (!user[0]) {
      return reply.status(404).send({ message: "Wrong data" });
    }
    return reply.send(user[0]);
  });
};
