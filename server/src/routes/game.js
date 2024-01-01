import 'dotenv/config';
import { Router } from 'express';
import * as GameController from '../controllers/game.js';

export const gameRouter = Router()
  .post('/', GameController.createGame)
  .get('/:id', GameController.getGame)
  .put('/:id', GameController.updateGame)
  .post('/:id/players', GameController.addPlayerToGame);
