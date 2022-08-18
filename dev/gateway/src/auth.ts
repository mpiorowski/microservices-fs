import { MercuriusContext } from 'mercurius';
import { Session } from '../../@types/session.type';
import { api } from './api';
import { Config } from './config';

export const authorize = async (ctx: MercuriusContext) => {
  try {
    const sessionId = ctx.reply.request.cookies.sessionId;
    if (!sessionId) {
      throw Error();
    }
    const session = await api<Session>({
      url: `${Config.USERS_URI}/sessions/${sessionId}`,
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
