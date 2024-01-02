import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';
import { chatRouter } from './routes/chat.js';
import { gameRouter } from './routes/game.js';
import { playerRouter } from './routes/player.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(json());

app.use('/', playerRouter);
app.use('/game', gameRouter);
app.use('/chat', chatRouter);

export default app;
