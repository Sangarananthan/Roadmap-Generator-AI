import React from "react";
import { useChat } from "./ChatApp";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

const Cards = () => {
  const { addMessage } = useChat();

  const handleCardClick = (message) => {
    addMessage(message);
  };

  return (
    <div className="flex flex-row gap-6 scale-75">
      <div
        className="cursor-pointer"
        onClick={() =>
          handleCardClick(
            "Generate a Roadmap for Full stack development in MERN stack"
          )
        }
      >
        <img
          src={image1}
          alt="MERN Stack Roadmap"
          className="rounded-[50px] shadow-md hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-shadow duration-300"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div
          className="cursor-pointer"
          onClick={() =>
            handleCardClick("give me what are the rounds present in TCS")
          }
        >
          <img
            src={image2}
            alt="TCS Rounds"
            className="rounded-[50px] shadow-md hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-shadow duration-300"
          />
        </div>

        <div
          className="cursor-pointer"
          onClick={() =>
            handleCardClick("Assist me with my Learning programing")
          }
        >
          <img
            src={image3}
            alt="Learning Programming"
            className="rounded-[50px] shadow-md hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-shadow duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
