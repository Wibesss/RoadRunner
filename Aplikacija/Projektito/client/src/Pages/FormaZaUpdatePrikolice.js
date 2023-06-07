import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const FormaZaUpdatePrikolice = ({
  handleUpdate,
  setTip,
  setZapremina,
  setNosivost,
  setDuzina,
  setSirina,
  setVisina,
  setTablice,
  setPhoto,
  tip,
  zapremina,
  nosivost,
  duzina,
  sirina,
  visina,
  tablice,
}) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [tipovi, setTipovi] = useState([]);
  useEffect(() => {
    axios.get(`/Prikolica/GetTipPrikolica`, config).then((response) => {
      setTipovi(response.data);
    });
  }, []);
  return (
    <div className=" w-3/5 overflow-hidden rounded-lg shadow-md m-5 ">
      <form
        className="mt-10  bg-white text-left text-sm text-gray-500  border border-gray-200 shadow-md p-5"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-6">
          <select key="a" onChange={(e) => setTip(e.target.value)} value={tip}>
            {tipovi.map((tip) => (
              <option key={tip.tip} value={tip.tip}>
                {tip.tip}
              </option>
            ))}
          </select>
          <input
            className=""
            type="number"
            placeholder="Zapremina"
            value={zapremina === null ? 0 : zapremina}
            required
            onChange={(e) => {
              setZapremina(e.target.value);
            }}
          ></input>
          <input
            className=""
            type="number"
            placeholder="Nosivost"
            value={nosivost === null ? 0 : nosivost}
            required
            onChange={(e) => {
              setNosivost(e.target.value);
            }}
          ></input>
          <input
            className=""
            type="number"
            placeholder="Duzina"
            value={duzina === null ? 0 : duzina}
            required
            onChange={(e) => {
              setDuzina(e.target.value);
            }}
          ></input>
          <input
            className=""
            type="number"
            placeholder="Sirina"
            value={sirina === null ? 0 : sirina}
            required
            onChange={(e) => {
              setSirina(e.target.value);
            }}
          ></input>
          <input
            className=""
            type="number"
            placeholder="Visina"
            value={visina === null ? 0 : visina}
            required
            onChange={(e) => {
              setVisina(e.target.value);
            }}
          ></input>
          <input
            className=""
            type="text"
            placeholder="Tablice"
            value={tablice}
            required
            onChange={(e) => {
              setTablice(e.target.value);
            }}
          ></input>
          <input
            type="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          ></input>
        </div>
        <div className="flex justify-center">
          <button type="submit " className="btn-primary py-2 px-4 mt-5">
            Izmeni Prikolicu
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormaZaUpdatePrikolice;
