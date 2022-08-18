import { IResolvers } from 'mercurius';
import { api } from './api';
import { Config } from './config';

export const resolvers: IResolvers = {
  Query: {
    users: async (_, _args, ctx) => {
      const users = await api({
        url: `${Config.USERS_URI}/users`,
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
      _ctx
    ) => {
      const body = args;
      const session = await api({
        url: `${Config.USERS_URI}/sessions`,
        method: 'POST',
        body: JSON.stringify(body),
      });
      return session;
    },
  },
};
