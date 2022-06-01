export type User = {
  id: string;
  email: string;
  password: string;
  created: Date;
  updated: Date | null;
};

export type Session = {
  id: string;

  userId: string;
  user?: User;

  expires: Date;
  created: Date;
  updated: Date | null;
};
