import { FastifyInstance } from 'fastify';
import { Message } from '../../../@types/messages.type';
import { insertMessage, selectAllMessages } from './messages.db';

export const messagesService = (app: FastifyInstance) => {
  app.get<{ Reply: Message[] }>('/messages', async (_req, res) => {
    const messages = await selectAllMessages();
    res.send(messages);
  });

  app.post<{ Reply: Message }>('/messages', async (req, res) => {
    const body = req.body as Message;
    const message = await insertMessage(body);
    if (!message[0]) {
      throw Error('Message not inserted');
    }
    res.send(message[0]);
  });
};
