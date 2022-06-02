export type User = {
  id: string;
  created: Date;
  updated: Date | null;

  email: string;
  password: string;
};

export type Session = {
  id: string;
  created: Date;
  updated: Date | null;

  userId: string;
  user?: User;

  expires: Date;
};
