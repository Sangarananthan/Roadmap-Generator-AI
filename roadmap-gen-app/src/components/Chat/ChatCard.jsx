import React from "react";

const ChatCard = ({ message }) => {
  const { content, isAi } = message;

  return (
    <div
      className={`px-4 py-2 rounded-2xl whitespace-pre-wrap ${
        !isAi
          ? "self-end max-w-[70%] bg-blue-900"
          : "self-start max-w-[85%] bg-zinc-800"
      }`}
    >
      <p className="text-lg text-white md:text-base">{content}</p>
    </div>
  );
};

export default ChatCard;
