import { FastifyReply } from 'fastify';
import { Session } from '../../@types/users.type';
import { api } from './api';
import { Config } from './config';

export const authorization = async (reply: FastifyReply) => {
  try {
    if (!reply.request.cookies.sessionId) {
      throw Error();
    }
    const session = await api<Session>({
      url: `${Config.USERS_URI}/sessions/${reply.request.cookies.sessionId}`,
      method: 'GET',
      body: null,
    });
    if (!session.id) {
      throw Error();
    }
    return session;
  } catch {
    throw new Error('Unauthorized');
  }
};
