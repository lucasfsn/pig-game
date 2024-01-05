import 'dotenv/config';
import { Router } from 'express';
import * as PlayerController from '../controllers/player.js';
import { authenticateToken } from '../middlewares/auth.js';

export const playerRouter = Router()
  .post('/signup', PlayerController.signUp)
  .post('/login', PlayerController.login)
  .get('/search', authenticateToken, PlayerController.search)
  .get('/leaderboard', authenticateToken, PlayerController.leaderboard)
  .get('/:username', authenticateToken, PlayerController.getPlayer)
  .put(
    '/change-password/:id',
    authenticateToken,
    PlayerController.changePassword
  )
  .put(
    '/change-username/:id',
    authenticateToken,
    PlayerController.changeUsername
  )
  .put('/change-role/:username', authenticateToken, PlayerController.changeRole)
  .put('/ban/:id', authenticateToken, PlayerController.banPlayer)
  .put('/unban/:id', authenticateToken, PlayerController.unbanPlayer)
  .delete('/:id', authenticateToken, PlayerController.deleteAccount);
