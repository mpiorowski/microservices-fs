import { Message } from '../../@types/messages.type';
import { Session, User } from '../../@types/users.type';
import { api } from './api';
import { Config } from './config';

export const loaders = {
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
    async user(queries: { obj: Message }[]) {
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
