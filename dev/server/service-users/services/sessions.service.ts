import dayjs from 'dayjs';
import { FastifyInstance } from 'fastify';
import { Config } from '../config';
import { insertSession, selectSessionById } from './sessions.db';
import { selectUserByEmail } from './users.db';

export const sessionsService = (app: FastifyInstance) => {
  app.get('/sessions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const sessions = await selectSessionById(id);

    if (!sessions[0]) {
      throw new Error('Session not found');
    }
    if (sessions[0].expires < new Date()) {
      throw new Error('Session expired');
    }
    reply.send(sessions[0]);
  });

  app.post<{ Body: { email: string; password: string } }>(
    '/sessions',
    async (request, reply) => {
      const body = request.body;

      const user = await selectUserByEmail(body.email);

      if (!user[0]) {
        throw new Error('User not found');
      }
      if (user[0].password !== body.password) {
        throw new Error('Password is incorrect');
      }

      const expires = dayjs()
        .add(Number(Config.USER_SESSION_EXPIRE_IN_HOURS), 'hour')
        .toDate();
      const session = await insertSession(user[0].id, expires);

      if (!session[0]) {
        throw new Error('Wrong data');
      }

      reply.send(session[0]);
    }
  );
};
