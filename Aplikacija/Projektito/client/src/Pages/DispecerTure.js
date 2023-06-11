import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import DispecerNoveTure from "./DispecerNoveTure";
import DispecerPrihvaceneTure from "./DispecerPrihvaceneTure";
const DispecerTure = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap mt-10">
      <div className="w-full sm:w-1/2 p-8">
        <DispecerNoveTure />
      </div>
      <div className="w-full sm:w-1/2 p-8">
        <DispecerPrihvaceneTure />
      </div>
    </div>
  );
};

export default DispecerTure;
