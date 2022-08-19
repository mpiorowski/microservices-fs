import { MercuriusLoaders } from 'mercurius';
import { Message } from '../../@types/messages.type';
import { Session } from '../../@types/session.type';
import { User } from '../../@types/users.type';
import { api } from './api';
import { authorize } from './auth';
import { Config } from './config';

export const loaders: MercuriusLoaders = {
  Session: {
    async user(queries: { obj: Session }[]) {
      const users = await api<User[]>({
        url: `${Config.USERS_URI}/users`,
        method: 'GET',
        body: null,
      });
      const usersByIds = queries.map((query) => {
        return users.find((user) => user.id === query.obj.userId);
      });
      return usersByIds;
    },
  },
  Message: {
    async user(queries: { obj: Message }[], ctx) {
      await authorize(ctx);
      const users = await api<User[]>({
        url: `${Config.USERS_URI}/users`,
        method: 'GET',
        body: null,
      });
      const usersByIds = queries.map((query) => {
        return users.find((user) => user.id === query.obj.userId);
      });
      return usersByIds;
    },
  },
};
