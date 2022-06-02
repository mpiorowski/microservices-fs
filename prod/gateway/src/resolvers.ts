import { IResolvers } from 'mercurius';
import { Session, User } from '../../@types/users.type';
import { api } from './api';
import { authorization } from './auth';
import { Config } from './config';

export const resolvers: IResolvers = {
  Query: {
    users: async () => {
      const users = await api<User[]>({
        url: `${Config.USERS_URI}/users`,
        method: 'GET',
        body: null,
      });
      return users;
    },
    session: async (_obj, _arg, ctx) => {
      const sessionId = ctx.reply.request.cookies.sessionId;
      const session = await api<Session>({
        url: `${Config.USERS_URI}/sessions/${sessionId}`,
        method: 'GET',
        body: null,
      });
      return session;
    },
    messages: async (_obj, _arg, ctx) => {
      await authorization(ctx.reply);
      const messages = await api<Session>({
        url: `${Config.MESSAGES_URI}/messages`,
        method: 'GET',
        body: null,
      });
      return messages;
    },
  },
  Mutation: {
    createUser: async (_, args: { email: string; password: string }) => {
      const { email, password } = args;
      const user = await api<User>({
        url: `${Config.USERS_URI}/users`,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return user;
    },
    createSession: async (
      _,
      args: { email: string; password: string },
      ctx
    ) => {
      const { email, password } = args;
      const session = await api<Session>({
        url: `${Config.USERS_URI}/sessions`,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      void ctx.reply.setCookie('sessionId', session.id, {
        path: '/',
        secure: false, // send cookie over HTTPS only
        domain: Config.COOKIE_DOMAIN,
        httpOnly: true,
        sameSite: true,
        expires: new Date(
          new Date().getTime() +
            Number(Config.USER_SESSION_EXPIRE_IN_HOURS) * 60 * 60 * 1000
        ),
      });
      return session;
    },
    createMessage: async (
      _,
      args: { input: { text1: string; text2: string; text3: string } },
      ctx
    ) => {
      const session = await authorization(ctx.reply);
      const user = await api<User>({
        url: `${Config.MESSAGES_URI}/messages`,
        method: 'POST',
        body: JSON.stringify({ ...args.input, userId: session.userId }),
      });
      return user;
    },
  },
};
