import { Session } from '../../../@types/session.type';
import { db } from '../../@utils/db.util';

export const insertSession = async (userId: string, expires: Date) => {
  const newSession = await db<Session>(
    'insert into sessions ("userId", expires) values ($1, $2) returning *',
    [userId, expires]
  );
  return newSession;
};

export const selectSessionById = async (id: string) => {
  const session = await db<Session>('select * from sessions where id = $1', [
    id,
  ]);
  return session;
};
