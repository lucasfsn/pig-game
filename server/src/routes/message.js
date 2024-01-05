import 'dotenv/config';
import { Router } from 'express';
import * as MessageController from '../controllers/message.js';

export const messageRouter = Router()
  .get('/:gameId', MessageController.getMessages)
  .post('/:gameId/:playerId', MessageController.addMessage)
  .delete('/:gameId/:messageId', MessageController.deleteMessage);
