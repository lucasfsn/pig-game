import 'dotenv/config';
import { Router } from 'express';
import * as MessageController from '../controllers/message.js';
import { authenticateToken } from '../middlewares/auth.js';

export const messageRouter = Router()
  .get('/:gameId', authenticateToken, MessageController.getMessages)
  .post('/:gameId/:playerId', authenticateToken, MessageController.addMessage)
  .delete(
    '/:gameId/:messageId',
    authenticateToken,
    MessageController.deleteMessage
  );
