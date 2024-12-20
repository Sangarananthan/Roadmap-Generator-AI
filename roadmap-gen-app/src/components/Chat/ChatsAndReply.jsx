import React, { useRef, useEffect } from "react";
import { useChat } from "./ChatApp";
import ChatCard from "./ChatCard";

const ChatsAndReply = () => {
  const { messages, isLoading } = useChat();
  const chatEndRef = useRef(null);
 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-12rem)] md:h-full overflow-y-auto px-2 custom-scrollbar">
      {messages.map((message) => (
        <ChatCard key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="self-start bg-zinc-800 px-3 md:px-4 py-2 rounded-2xl">
          <div className="flex gap-2">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-400 rounded-full animate-bounce" />
            <div
              className="w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatsAndReply;
