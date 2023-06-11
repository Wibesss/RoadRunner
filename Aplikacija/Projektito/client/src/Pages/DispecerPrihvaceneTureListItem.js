import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { Image } from "react-native";

const DispecerPrihvaceneTureListItem = ({
  item,
  mapa,
  setMapa,
  setTuraId,
  setPocetnaGS,
  setPocetnaGD,
  setKrajnjaGS,
  setKrajnjaGD,
  vozaci,
  setVozaci,
  setKompanijaID,
}) => {
  return (
    <tr className="bg-white border-b">
      <td className="p-4 whitespace-nowrap">
        <div className="flex justify-center">
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            source={{ uri: item.logo }}
          />
        </div>
      </td>
      <td className="p-4 whitespace-nowrap">{item.kompanijaNaziv}</td>
      <td className="p-4 whitespace-nowrap">{item.tipRobe}</td>
      <td className="p-4 whitespace-nowrap">
        {item.tezinaRobe === null ? "-" : item.tezinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.duzinaRobe === null ? "-" : item.duzinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.sirinaRobe === null ? "-" : item.sirinaRobe}
      </td>
      <td className="p-4 whitespace-nowrap">
        {item.visinaRobe === null ? "-" : item.visinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.zapreminaRobe === null ? "-" : item.zapreminaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">{item.duzina}</td>
      <td className="p-4 whitespace-nowrap">{item.datumPocetka}</td>
      <td>
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => {
            setMapa(!mapa);
            setPocetnaGS(item.pocetnaGeografskaSirina);
            setPocetnaGD(item.pocetnaGeografskaDuzina);
            setKrajnjaGS(item.odredisnaGeografskaSirina);
            setKrajnjaGD(item.odredisnaGeografskaDuzina);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-500"
            viewBox="0 0 2048 2048"
          >
            <path
              d="M673 924h428c9 21 18 43 27 64H691l-47 79-298 497h1360l-332-576h-217c9-21 18-43 27-64h226l9 16 369 640 28 48H233l29-48 384-640 9-16h18z"
              className="fill-current text-gray-800 stroke-current stroke-2.5"
            />
            <path
              d="m691 1200 286-68c-23-50-43-93-65-144H690l-47 78 47 134zM1005 1190l-292 70 75 212 773-161-187-324h-69c-26 61-52 117-80 177-19 41-32 73-49 115-18 44-36 89-66 88-32-2-46-35-64-79-13-31-28-67-41-98zM752 1564l-151-427-256 427zM1594 1370l-785 164 10 30h886z"
              className="fill-green-500"
            />
            <path
              d="m601 1137 151 427h68l-11-30 785-164-34-58-773 161-75-212 292-70c-4-10-9-20-14-31-25-55-53-114-77-171 22 51 41 93 65 144l-286 68-47-134-42 71z"
              className="fill-green-100"
            />
            <path
              d="M1109 420c82 0 156 33 209 87 54 54 87 128 87 209 0 37-24 109-58 192-32 80-75 173-113 256-25 53-42 97-56 129-24 60-37 90-68 91-32 1-45-30-70-92-13-31-30-72-54-125-39-84-82-178-114-258-34-84-58-156-58-194 0-82 33-156 87-209 54-54 128-87 209-87zm0 166c32 0 62 13 83 34s34 51 34 83-13 62-34 83-51 34-83 34-62-13-83-34-34-51-34-83 13-62 34-83 51-34 83-34z"
              className="fill-red-500"
            />
            <path
              d="M1109 420v166c-32 0-62 13-83 34s-34 51-34 83 13 62 34 83 51 34 83 34v564c-31 0-44-31-69-92-13-31-30-72-54-125-39-84-82-178-114-258-34-84-58-156-58-194 0-82 33-156 87-209 54-54 128-87 209-87z"
              className="fill-red-600"
            />
          </svg>
        </button>
      </td>
      <td>
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => {
            setKompanijaID(item.kompanijaId);
            setVozaci(!vozaci);
            setTuraId(item.turaId);
          }}
        >
          <img
            src="https://www.freeiconspng.com/uploads/driver-icon-10.png"
            className="w-12 h-12"
            alt="Driver Svg Icon"
          />
        </button>
      </td>
    </tr>
  );
};

export default DispecerPrihvaceneTureListItem;
