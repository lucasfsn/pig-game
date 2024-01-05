import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';
import { gameRouter } from './routes/game.js';
import { messageRouter } from './routes/message.js';
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
app.use('/message', messageRouter);

export default app;
