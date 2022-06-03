import { User } from '../../../@types/users.type';
import { db } from '../../@utils/db.util';

export const insertUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const newUser = await db<User>(
    'insert into users (email, password) values ($1, $2) returning *',
    [email, password]
  );
  return newUser;
};

export const selectUserByEmail = async (email: string) => {
  const user = await db<User>('select * from users where email = $1', [email]);
  return user;
};

export const selectAllUsers = async () => {
  const user = await db<User>('select * from users', []);
  return user;
};
