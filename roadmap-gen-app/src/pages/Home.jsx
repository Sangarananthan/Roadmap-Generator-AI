import ChatApp from "../components/Chat/ChatApp";

const Home = () => {
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center text-white ">
      <div className=" sm:w-full md:w-2/3 h-screen flex flex-col items-center justify-around">
        {/* HEADER */}
        <div
          className="flex items-center justify-center flex-col gap-4 px-4 w-full
        "
        >
          <h1 className="text-6xl font-medium text-center">Generate Roadmap</h1>
          <h3>
            Master Any Skill or Ace Your Placement Goals with Personalized
            Roadmaps
          </h3>
        </div>
        {/* CHAT INTERFACE */}
        <ChatApp />
      </div>
    </div>
  );
};

export default Home;
