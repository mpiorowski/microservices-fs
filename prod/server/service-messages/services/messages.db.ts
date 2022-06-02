import { Message } from '../../../@types/messages.type';
import { db } from '../../@utils/db.util';

export const selectAllMessages = async () => {
  const message = await db<Message>('select * from messages', []);
  return message;
};

export const insertMessage = async (message: Message) => {
  const result = await db<Message>(
    'insert into messages ("userId", text1, text2, text3) values ($1, $2, $3, $4) returning *',
    [message.userId, message.text1, message.text2, message.text3]
  );
  return result;
};
