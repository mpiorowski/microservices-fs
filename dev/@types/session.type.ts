import { User } from './users.type';

export type Session = {
  id: string;
  created: Date;
  updated: Date | null;

  userId: string;
  user?: User;
};
