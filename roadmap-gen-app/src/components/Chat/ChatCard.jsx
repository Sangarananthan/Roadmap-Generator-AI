import React from "react";

const ChatCard = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.isAi ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[90%] md:max-w-[80%] px-3 md:px-4 py-2 rounded-2xl ${
          message.isAi ? "bg-zinc-800" : "bg-blue-600"
        }`}
      >
        {message.isAi ? (
          <div 
            dangerouslySetInnerHTML={{ __html: message.content }}
            className="prose prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-1 max-w-none
              prose-sm md:prose-base
              prose-h2:text-lg md:prose-h2:text-2xl
              prose-p:text-sm md:prose-p:text-base"
          />
        ) : (
          <div className="text-sm md:text-base">{message.content}</div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
