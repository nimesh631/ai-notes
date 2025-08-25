import React, { useState } from "react";
import axios from "axios";

function GeminiChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMessage = { role: "bot", content: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="flex-1 h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-indigo-600 text-white font-bold text-lg shadow-md">
        🤖 Gemini AI Chat
      </div>

      {/* Messages */}
      <div className="flex flex-col p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl max-w-xl ${
              msg.role === "user"
                ? "ml-auto bg-indigo-500 text-white"
                : "mr-auto bg-white border shadow"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default GeminiChat;
