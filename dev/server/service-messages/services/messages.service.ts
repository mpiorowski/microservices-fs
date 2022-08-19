import { FastifyInstance } from 'fastify';
import { Message } from '../../../@types/messages.type';
import { insertMessage, selectAllMessages } from './messages.db';

export const messagesService = (app: FastifyInstance) => {
  app.get<{ Reply: Message[]; Querystring: { userId: string } }>(
    '/messages',
    async (req, res) => {
      const messages = await selectAllMessages(req.query.userId);
      res.send(messages);
    }
  );

  app.post<{ Reply: Message }>('/messages', async (req, res) => {
    const body = req.body as Message;
    const message = await insertMessage(body);
    if (!message[0]) {
      throw Error('Message not inserted');
    }
    res.send(message[0]);
  });
};
