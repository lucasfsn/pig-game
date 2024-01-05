import mqtt from 'mqtt';

export function mqttPublish(topic, message) {
  const client = mqtt.connect('ws://localhost:9001/mqtt');

  client.on('connect', () => {
    client.publish(topic, message);
    client.end();
  });
}
