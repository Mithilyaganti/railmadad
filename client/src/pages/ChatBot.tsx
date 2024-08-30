import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      // Here you would typically send the message to your backend and get a response
      setMessages((prev) => [...prev, { text: "Thank you for your message. An agent will respond shortly.", isUser: false }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`my-2 p-2 rounded ${message.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-l px-4 py-2"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;