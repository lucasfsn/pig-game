import { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IoMdPerson } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { mqttPublish } from '../../helpers/mqttPublish.js';
import { useMqttSubscribe } from '../../hooks/useMqttSubscribe.js';
import Button from '../ui/Button.jsx';
import { getUser } from '../user/userSlice.js';
import { useGame } from './useGame.js';

function GameChat({ game }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const { getMessages, addMessage, deleteMessage } = useGame();
  const user = useSelector(getUser);
  const [mqttAdd, mqttAddClear] = useMqttSubscribe(
    `game/${game._id}/chat/message/add`
  );
  const [mqttDelete, mqttDeleteClear] = useMqttSubscribe(
    `game/${game._id}/chat/message/delete`
  );

  useEffect(() => {
    async function fetchMessages() {
      const allMessages = await getMessages(game._id);

      setMessages(allMessages);
    }

    fetchMessages();

    if (mqttAdd) {
      mqttAddClear();
    }

    if (mqttDelete) {
      mqttDeleteClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game._id, mqttAdd, mqttDelete, mqttDeleteClear, mqttAddClear]);

  async function handleSend() {
    await addMessage(game._id, user._id, message);
    setMessage('');
    mqttPublish(
      `game/${game._id}/chat/message/add`,
      JSON.stringify({ message })
    );
  }

  async function handleDelete(id) {
    await deleteMessage(game._id, id);
    mqttPublish(`game/${game._id}/chat/message/delete`, JSON.stringify({ id }));
  }

  return (
    <div className="w-1/4 bg-gray-900 h-full flex flex-col-reverse px-3 py-4 gap-5 overflow-y-scroll">
      {game.player1._id === user._id || game.player2?._id === user._id ? (
        <div className="flex gap-2 sticky right-0 bottom-0 bg-gray-900">
          <input
            type="text"
            className="w-4/5 rounded-full text-xl px-3 outline-none text-black"
            placeholder="Send message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button bgColor="bg-pink-600" onClick={handleSend}>
            Send
          </Button>
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        {messages?.map(message => (
          <div
            key={message._id}
            className={`flex gap-2 text-xl lg:text-3xl ${
              message.player._id === user._id ? 'justify-start' : 'justify-end'
            }`}
          >
            <div className="flex gap-2 text-center">
              <div className="text-center bg-gray-500 rounded-full p-1">
                <IoMdPerson />
              </div>
              <p>
                {message.player._id === user._id
                  ? 'You'
                  : message.player.username}
                :
              </p>
            </div>
            <p className="text-gray-300">{message.text}</p>
            {message.player._id === user._id ? (
              <button
                className="text-pink-800 hover:text-pink-700"
                onClick={() => handleDelete(message._id)}
              >
                <HiXMark />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameChat;
