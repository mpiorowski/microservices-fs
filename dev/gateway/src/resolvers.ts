import { IResolvers } from 'mercurius';
import { api } from './api';
import { Config } from './config';

export const resolvers: IResolvers = {
  Query: {
    users: async (_, _args, _ctx) => {
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
  },
};
