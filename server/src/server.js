import mongoose from 'mongoose';
import app from './app.js';
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

    app.listen(port, 'localhost', () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
