import React from 'react'
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import DispecerNoveTure from './DispecerNoveTure';
import DispecerPrihvaceneTure from './DispecerPrihvaceneTure';
const DispecerTure = () => {
  return (
    <div className = "flex flex-row flex-wrap wrap">
      <div className = "w-1/2">
        <div className = "w-11/12">
          <DispecerNoveTure />
         </div>
      </div>
      <div className = "w-1/2">
        <div className = "w-11/12">
          <DispecerPrihvaceneTure />
        </div>
      </div> 
    </div>
  )
}

export default DispecerTure
