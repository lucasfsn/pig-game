import mqtt from 'mqtt';
import CommentModel from './models/chat.js';

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('chat');
});

client.on('message', async (topic, message) => {
  if (topic === 'chat') {
    const comment = new CommentModel({
      text: message.toString(),
    });
    await comment.save();
  }
});

export default client;
