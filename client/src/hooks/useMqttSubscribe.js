import mqtt from 'mqtt';
import { useEffect, useState } from 'react';

const brokerUrl = process.env.REACT_APP_BROKER_URL;

export function useMqttSubscribe(topic) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      client.subscribe(topic);
    });

    client.on('message', (topic, message) => {
      setMessage(message.toString());
    });

    return () => {
      client.end();
    };
  }, [topic]);

  function clearMessage() {
    setMessage(null);
  }

  return [message, clearMessage];
}
