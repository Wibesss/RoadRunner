import React from "react";
import gif404 from "../assets/img/404.gif";
import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={gif404} alt="gif404" />
      <Link to={"/"} className="btn btn-prim btn-xl">
        Vrati se na početnu stranicu
      </Link>
    </div>
  );
};

export default MissingPage;
