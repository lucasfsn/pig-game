import 'dotenv/config';
import { Router } from 'express';
import * as ChatController from '../controllers/chat.js';

export const chatRouter = Router().get(
  '/:gameId',
  ChatController.getChatHistory
);
