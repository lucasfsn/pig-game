import mqtt from 'mqtt';

const brokerUrl = process.env.REACT_APP_BROKER_URL;

export function mqttPublish(topic, message) {
  const client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    client.publish(topic, message);
    client.end();
  });
}
