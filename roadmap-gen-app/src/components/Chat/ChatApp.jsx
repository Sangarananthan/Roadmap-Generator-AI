import React, { useReducer, createContext, useContext } from "react";
import PropTypes from "prop-types";
import UserInput from "./UserInput";
import ChatsAndReply from "./ChatsAndReply";
import Gemni from "../../Model/Gemni";
import Cards from "./Cards";

const createMessage = (content, isAi = false) => ({
  id: Date.now(),
  content,
  isAi,
  timestamp: new Date().toISOString(),
});

export const ChatContext = createContext({
  messages: [],
  addMessage: () => {},
  isLoading: false,
});

const chatReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const ChatProvider = ({ children }) => {
  const initialState = {
    messages: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  const formatResponse = (text) => {
    // Replace headers
    let formatted = text.replace(
      /^##\s+(.+)$/gm,
      '<h2 class="text-2xl font-bold my-4">$1</h2>'
    );

    // Replace bold text
    formatted = formatted.replace(
      /\*\*(.+?)\*\*/g,
      '<span class="font-semibold">$1</span>'
    );

    // Convert lists to proper HTML with bullets
    formatted = formatted.replace(
      /^\*\s+(.+)$/gm,
      '<li class="ml-6 list-disc">$1</li>'
    );

    // Wrap lists in ul tags
    formatted = formatted.replace(
      /((?:<li[^>]*>.*<\/li>\s*)+)/g,
      '<ul class="my-2">$1</ul>'
    );

    return formatted;
  };

  const addMessage = async (content) => {
    console.log("Adding message:", content);

    const userMessage = createMessage(content);
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // const res = await Gemni(content);
      const res = "Vanakam da mapla";
      const formattedResponse = formatResponse(res);
      const aiResponse = createMessage(formattedResponse, true);
      dispatch({ type: "ADD_MESSAGE", payload: aiResponse });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        addMessage,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

const ChatContent = () => {
  const { isLoading, messages } = useChat();

  return (
    <>
      <div className="h-[calc(100vh-4rem)] md:h-4/6 w-full px-4 md:px-[2rem] flex flex-col gap-[1rem]">
        {messages.length === 0 && (
          <div className="flex items-center flex-col justify-center h-full">
            <h1 className="font-medium self-center text-lg md:text-xl pt-4">
              It&apos;s <span className="text-[#FF9595]">great</span> to see you
              👋🏻
            </h1>
            <Cards />
          </div>
        )}
        <ChatsAndReply />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[4rem] md:static md:h-[3rem] w-full flex justify-center items-center mb-0 md:mb-[1rem] px-4 md:px-[2rem]">
        <UserInput />
      </div>
    </>
  );
};

const ChatApp = () => {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
};

export default ChatApp;
