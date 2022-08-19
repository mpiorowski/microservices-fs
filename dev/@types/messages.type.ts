import { User } from './users.type';
export type Message = {
  id: string;
  created: Date;
  updated: Date | null;

  userId: string;
  user?: User;

  text1: string;
  text2: string;
  text3: string;
};
