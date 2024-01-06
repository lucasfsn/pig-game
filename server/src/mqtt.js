import mqtt from 'mqtt';
import env from './utils/validateEnv.js';

const client = mqtt.connect(env.BROKER_URL);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('player/+/ban');
  client.subscribe('game/+/lobbyOwnerBan');
  client.subscribe('game/+/join');
  client.subscribe('game/+/leave');
  client.subscribe('game/+/hold');
  client.subscribe('game/+/roll');
  client.subscribe('game/+/chat/message/add');
  client.subscribe('game/+/chat/message/delete');
});

client.on('error', error => {
  console.error('Error from MQTT:', error);
});

client.on('reconnect', () => {
  console.log('Reconnecting to MQTT broker...');
});

client.on('offline', () => {
  console.log('MQTT client is offline');
});

client.on('end', () => {
  console.log('MQTT client disconnected');
});

export default client;
