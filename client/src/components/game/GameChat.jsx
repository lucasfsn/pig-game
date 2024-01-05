import { useState } from 'react';
import Button from '../ui/Button.jsx';

function GameChat() {
  const [message, setMessage] = useState('');

  function handleSend() {
    setMessage('');
  }

  return (
    <div className="w-1/4 bg-gray-900 h-full flex flex-col-reverse px-3 py-4 gap-5">
      <div className="flex gap-2">
        <input
          type="text"
          className="w-4/5 rounded-full text-xl px-3 outline-none text-black"
          placeholder="Send message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button bgColor="bg-pink-600" onClick={handleSend}>
          Send
        </Button>
      </div>
      <div>Chat</div>
    </div>
  );
}

export default GameChat;
