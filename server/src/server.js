import fs from 'fs';
import http from 'http';
import https from 'https';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';
import app from './app.js';
import mqttClient from './mqtt.js';
import env from './utils/validateEnv.js';

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    const homeDir = os.homedir();
    // const options = {
    //   key: fs.readFileSync(path.join(homeDir, 'SSL-PigGame/key_psw')),
    //   cert: fs.readFileSync(path.join(homeDir, 'SSL-PigGame/cert')),
    // };
    const server = http.createServer(app);

    server.listen(port, 'localhost', () => {
      console.log(`Listening on https://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
