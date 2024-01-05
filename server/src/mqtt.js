import mqtt from 'mqtt';

const client = mqtt.connect('ws://localhost:9001/mqtt');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('player/ban');
  client.subscribe('game/join');
  client.subscribe('game/leave');
  client.subscribe('game/hold');
  client.subscribe('game/roll');
  client.subscribe('game/chat/message');
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
