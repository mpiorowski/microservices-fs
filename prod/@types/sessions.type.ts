import { User } from "./users.type";

export type Session = {
  id: string;

  userId: string;
  user?: User;

  expires: Date;
  created: Date;
  updated: Date | null;
};
