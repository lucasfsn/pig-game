import 'dotenv/config';
import { Router } from 'express';
import * as GameController from '../controllers/game.js';
import { authenticateToken } from '../middlewares/auth.js';

export const gameRouter = Router()
  .post('/', authenticateToken, GameController.createGame)
  .get('/:id', authenticateToken, GameController.getGame)
  .put('/:id', authenticateToken, GameController.updateGame)
  .post('/:id', authenticateToken, GameController.joinGame)
  .delete('/:id', authenticateToken, GameController.deleteGame)
  .put('/leave/:id', authenticateToken, GameController.leaveGame);
