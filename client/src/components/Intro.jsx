import React from "react";
import ph from "../assets/black-bg.png";

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${ph})` }}
        ></div>
      </div>
    </div>
  );
};

export default Intro;
