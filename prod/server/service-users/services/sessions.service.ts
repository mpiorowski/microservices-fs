import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import type { FastifyInstance } from 'fastify';
import { Session } from '../../../@types/users.type';
import { Config } from '../config';
import {
  insertSession,
  selectAllSessions,
  selectSessionById,
} from './sessions.db';
import { selectUserByEmail } from './users.db';

export const sessionsService = (app: FastifyInstance) => {
  app.get<{ Reply: Session[] | Error }>(
    '/sessions',
    async (_request, reply) => {
      const sessions = await selectAllSessions();
      reply.send(sessions);
    }
  );

  app.get<{ Reply: Session | Error; Params: { id: string } }>(
    '/sessions/:id',
    async (request, reply) => {
      const { id } = request.params;
      const session = await selectSessionById(id);
      if (!session[0]) {
        return reply.status(404).send(Error('Session not found'));
      }
      if (session[0].expires < new Date()) {
        throw reply.status(404).send(Error('Session expired'));
      }
      return reply.send(session[0]);
    }
  );

  app.post<{
    Reply: Session | Error;
    Body: {
      email: string;
      password: string;
    };
  }>('/sessions', async (request, reply) => {
    const { email, password } = request.body;
    const user = await selectUserByEmail(email);
    if (!user[0]) {
      return reply.status(404).send(Error('User not found'));
    }
    if (!bcrypt.compareSync(password, user[0].password)) {
      return reply.status(401).send(Error('Password is incorrect'));
    }

    const expire = dayjs()
      .add(Number(Config.USER_SESSION_EXPIRE_IN_HOURS), 'hour')
      .toDate();
    const session = await insertSession(user[0].id, expire);
    if (!session[0]) {
      return reply.status(404).send(Error('Wrong data'));
    }
    return reply.send(session[0]);
  });
};
