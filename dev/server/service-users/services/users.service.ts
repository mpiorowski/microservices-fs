import { FastifyInstance } from 'fastify';
import { insertUser, selectAllUsers } from './users.db';

export const usersService = (app: FastifyInstance) => {
  app.get('/users', async (_request, reply) => {
    const users = await selectAllUsers();
    reply.send(users);
  });

  app.post<{ Body: { email: string; password: string } }>(
    '/users',
    async (request, reply) => {
      const body = request.body;
      const newUser = await insertUser(body);

      if (!newUser[0]) {
        throw new Error('User not created');
      }

      reply.send(newUser[0]);
    }
  );
};
