import { IResolvers } from 'mercurius';
import { Session } from '../../@types/session.type';
import { api } from './api';
import { authorize } from './auth';
import { Config } from './config';

export const resolvers: IResolvers = {
  Query: {
    users: async (_, _args, ctx) => {
      await authorize(ctx);
      const users = await api({
        url: `${Config.USERS_URI}/users`,
        method: 'GET',
        body: null,
      });
      return users;
    },
    messages: async (_, _args, ctx) => {
      const session = await authorize(ctx);
      const users = await api({
        url: `${Config.MESSAGES_URI}/messages?userId=${session.userId}`,
        method: 'GET',
        body: null,
      });
      return users;
    },
  },
  Mutation: {
    insertUser: async (_, args, _ctx) => {
      const body = args as { email: string; password: string };
      const user = await api({
        url: `${Config.USERS_URI}/users`,
        method: 'POST',
        body: JSON.stringify(body),
      });
      return user;
    },
    insertSession: async (
      _,
      args: { email: string; password: string },
      ctx
    ) => {
      const body = args;
      const session = await api<Session>({
        url: `${Config.USERS_URI}/sessions`,
        method: 'POST',
        body: JSON.stringify(body),
      });
      ctx.reply.setCookie('sessionId', session.id, {
        path: '/',
        secure: false, // send cookie over HTTPS only
        httpOnly: true,
        expires: new Date(session.expires),
      });
      return session;
    },
    logout: async (_, _args, ctx) => {
      ctx.reply.setCookie('sessionId', '', {
        path: '/',
        secure: false, // send cookie over HTTPS only
        httpOnly: true,
        expires: new Date(0),
      });
      return true;
    },

    insertMessasge: async (_, args, ctx) => {
      const session = await authorize(ctx);
      const body = args as { text1: string; text2: string; text3: string };
      const message = await api({
        url: `${Config.MESSAGES_URI}/messages`,
        method: 'POST',
        body: JSON.stringify({ ...body, userId: session.userId }),
      });
      return message;
    },
  },
};
