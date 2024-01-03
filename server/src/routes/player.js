import 'dotenv/config';
import { Router } from 'express';
import * as PlayerController from '../controllers/player.js';

export const playerRouter = Router()
  .post('/signup', PlayerController.signUp)
  .post('/login', PlayerController.login)
  .get('/search', PlayerController.search)
  .get('/leaderboard', PlayerController.leaderboard)
  .get('/:username', PlayerController.getPlayer)
  .put('/change-password/:id', PlayerController.changePassword)
  .put('/change-username/:id', PlayerController.changeUsername)
  .delete('/:id', PlayerController.deleteAccount);
