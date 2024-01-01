import 'dotenv/config';
import { Router } from 'express';
import * as PlayerController from '../controllers/player.js';

export const playerRouter = Router()
  .post('/signup', PlayerController.signUp)
  .post('/login', PlayerController.login)
  .get('/:id', PlayerController.getPlayerDetails);
