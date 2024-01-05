import fs from 'fs';
import http from 'http';
import https from 'https';
// import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';
import { Server } from 'socket.io';
import app from './app.js';
import GameModel from './models/game.js';
import mqttClient from './mqtt.js';
import env from './utils/validateEnv.js';

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Mongoose connected');

    mqttClient.on('connect', () => {
      console.log('MQTT client connected');
    });

    const homeDir = os.homedir();
    const options = {
      key: fs.readFileSync(path.join(homeDir, 'SSL-PigGame/key_psw')),
      cert: fs.readFileSync(path.join(homeDir, 'SSL-PigGame/cert')),
    };
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    const gameChange = GameModel.watch();

    gameChange.on('change', async game => {
      const updatedGame = await GameModel.findById(
        game.documentKey._id
      ).populate('player1 player2', '_id username');

      console.log('Emitting game update', updatedGame);

      io.to(game.documentKey._id).emit('game update', updatedGame);
    });

    io.on('connection', socket => {
      socket.on('player banned', playerId => {
        io.emit('player banned', playerId);
      });

      socket.on('join game', gameId => {
        socket.join(gameId);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    server.listen(port, 'localhost', () => {
      console.log(`Listening on https://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
