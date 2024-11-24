import React, { useReducer, createContext, useContext } from "react";
import UserInput from "./UserInput";
import ChatsAndReply from "./ChatsAndReply";
import Gemni from "../../Model/Gemni";

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

  const addMessage = async (content) => {
    console.log("Adding message:", content);

    const userMessage = createMessage(content);
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // const res = await Gemni(content);
      const res = "vanakam da mapla";
      const aiResponse = createMessage(res, true);
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

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

const ChatApp = () => {
  const { isLoading } = useChat();

  return (
    <ChatProvider>
      {/* RESPONSE */}
      <div className="h-4/6 w-full px-[2rem] flex flex-col gap-[1rem]">
        <h1 className="font-medium self-center">
          It's <span className="text-[#FF9595]"> great</span> to see you 👋🏻
        </h1>
        <ChatsAndReply />
      </div>
      {/* USER PROMPT */}
      <div className="h-[3rem] w-[100%] flex justify-center items-center mb-[1rem] px-[2rem]">
        <UserInput />
      </div>
      {/* <div className="h-screen bg-zinc-900 text-white p-4 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ChatsAndReply />
        </div>
        <div className="mt-4">
          <UserInput />
          {isLoading && <p className="text-gray-400 mt-2">AI is typing...</p>}
        </div>
      </div> */}
    </ChatProvider>
  );
};

export default ChatApp;
