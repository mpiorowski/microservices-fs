import { Session } from '../../../@types/users.type';
import { db } from '../../@utils/db.util';

export const selectAllSessions = async () => {
  const sessions = await db<Session>('SELECT * FROM sessions', []);
  return sessions;
};

export const selectSessionById = async (id: string) => {
  const session = await db<Session>('SELECT * FROM sessions WHERE id = $1', [
    id,
  ]);
  return session;
};

export const insertSession = async (userId: string, expires: Date) => {
  const session = await db<Session>(
    'INSERT INTO sessions ("userId", expires) VALUES ($1, $2) RETURNING *',
    [userId, expires]
  );
  return session;
};
