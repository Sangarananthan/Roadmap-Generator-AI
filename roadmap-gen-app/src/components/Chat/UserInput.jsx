import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useChat } from "./ChatApp";

const UserInput = () => {
  const [value, setValue] = useState("");
  const { addMessage, isLoading } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      await addMessage(value.trim());
      setValue("");
    }
  };

  return (
    <form
      className="flex bg-zinc-800 items-center justify-between h-14 w-full rounded-full py-1 px-1"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="ml-6 bg-transparent text-white w-full focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="bg-white h-full w-20 rounded-full flex items-center justify-center pl-1 text-black transition duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
      >
        <IoSend className="scale-150" />
      </button>
    </form>
  );
};

export default UserInput;
