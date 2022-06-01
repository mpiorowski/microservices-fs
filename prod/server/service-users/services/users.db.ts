import { User } from '../../../@types/users.type';
import { db } from '../../@utils/db.util';

export const selectAllUsers = async () => {
  const users = await db<User>(`SELECT * FROM users`, []);
  return users;
};

export const selectUserById = async (id: string) => {
  const user = await db<User>(`SELECT * FROM users WHERE id = $1`, [id]);
  return user;
};

export const selectUserByEmail = async (email: string) => {
  const user = await db<User>(`SELECT * FROM users WHERE email = $1`, [email]);
  return user;
};

export const insertUser = async (email: string, password: string) => {
  const user = await db<User>(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, password]
  );
  return user;
};
