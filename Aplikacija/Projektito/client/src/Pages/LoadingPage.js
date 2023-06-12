import React from "react";
import loadingGif from "../assets/img/loadingGif.gif";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={loadingGif} alt="gif404" />
      <p className="text-6xl text-primary">Loading...</p>
    </div>
  );
};

export default LoadingPage;
