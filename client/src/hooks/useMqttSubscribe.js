import mqtt from 'mqtt';
import { useEffect, useState } from 'react';

export function useMqttSubscribe(topic) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const client = mqtt.connect('ws://localhost:9001/mqtt');

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
