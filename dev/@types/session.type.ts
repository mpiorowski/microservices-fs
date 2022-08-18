import { User } from './users.type';

export type Session = {
  id: string;
  created: Date;
  updated: Date | null;
  expires: Date;

  userId: string;
  user?: User;
};
