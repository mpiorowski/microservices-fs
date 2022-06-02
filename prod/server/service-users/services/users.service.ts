import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import { User } from '../../../@types/users.type';
import { insertUser, selectAllUsers } from './users.db';

export const usersService = (app: FastifyInstance) => {
  app.get<{ Reply: User[] | Error }>('/users', async (_request, reply) => {
    const users = await selectAllUsers();
    reply.send(users);
  });

  app.post<{
    Reply: User | Error;
    Body: {
      email: string;
      password: string;
    };
  }>('/users', async (request, reply) => {
    const { email, password } = request.body;

    const hashPassword = bcrypt.hashSync(password);
    const user = await insertUser(email, hashPassword);

    if (!user[0]) {
      reply.status(404).send(Error('Wrong data'));
    }
    reply.send(user[0]);
  });
};
