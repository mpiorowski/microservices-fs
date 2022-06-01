import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import type { FastifyInstance } from 'fastify';
import { Config } from '../config';
import {
  insertSession,
  selectAllSessions,
  selectSessionById,
} from './sessions.db';
import { selectUserByEmail } from './users.db';

export const sessionsService = (app: FastifyInstance) => {
  app.get('/sessions', async (_request, reply) => {
    const sessions = await selectAllSessions();
    reply.send(sessions);
  });

  app.get('/sessions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const session = await selectSessionById(id);
    if (!session[0]) {
      reply.send(404).send({ message: 'Session not found' });
    }
    reply.send(session[0]);
  });

  app.post('/sessions', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const user = await selectUserByEmail(email);
    if (!user[0]) {
      return reply.send(404).send({ message: 'User not found' });
    }
    if (!bcrypt.compareSync(password, user[0].password)) {
      return reply.send(401).send({ message: 'Password is incorrect' });
    }

    const expire = dayjs()
      .add(Number(Config.USER_SESSION_EXPIRE_IN_HOURS), 'hour')
      .toDate();
    const session = await insertSession(user[0].id, expire);
    if (!session[0]) {
      return reply.status(404).send({ message: 'Wrong data' });
    }
    return reply.send(session[0]);
  });
};
