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
  photo,
}) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [tipovi, setTipovi] = useState([]);
  useEffect(() => {
    axios
      .get(`/Prikolica/GetTipPrikolica`, config)
      .then((response) => {
        setTipovi(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center sm:w-3/5 overflow-hidden rounded-lg shadow-md ">
      <form
        className="p-2 sm:p-4 mt-6 w-4/5 sm:w-full bg-white text-left text-sm text-gray-500  border border-gray-200 shadow-md"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
            disabled = {tip!=="Cisterna"}
            onChange={(e) => {
              setZapremina(e.target.value);
            }}
          />
          <input
            className=""
            type="number"
            placeholder="Nosivost"
            value={nosivost === null ? 0 : nosivost}
            required
            disabled = {tip==="Cisterna"}
            onChange={(e) => {
              setNosivost(e.target.value);
            }}
          />
          <input
            className=""
            type="number"
            placeholder="Duzina"
            value={duzina === null ? 0 : duzina}
            required
            disabled = {tip==="Cisterna"}
            onChange={(e) => {
              setDuzina(e.target.value);
            }}
          />
          <input
            className=""
            type="number"
            placeholder="Sirina"
            value={sirina === null ? 0 : sirina}
            required
            disabled = {tip==="Cisterna"}
            onChange={(e) => {
              setSirina(e.target.value);
            }}
          />
          <input
            className=""
            type="number"
            placeholder="Visina"
            value={visina === null ? 0 : visina}
            required
            disabled = {tip==="Cisterna"}
            onChange={(e) => {
              setVisina(e.target.value);
            }}
          />
          <input
            className=""
            type="text"
            placeholder="Tablice"
            value={tablice}
            required
            onChange={(e) => {
              setTablice(e.target.value);
            }}
          />
          <div className="flex flex-col sm:flex-row justify-start items-center">
            <input
              type="file"
              id="customFilePhoto"
              name="file"
              placeholder={"Photo"}
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
              autoComplete="off"
            />
            <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-start  flex-wrap ">
              <label
                className="btn-prim w-40 flex flex-row justify-center items-center"
                htmlFor="customFilePhoto"
              >
                Izaberi Sliku
              </label>
              <p className="text-muted ml-2">
                {photo === null
                  ? ""
                  : photo.name === undefined
                  ? " slika nije izabrana"
                  : `Izabrana slika:${photo.name}`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit "
            className="btn-prim sm:w-1/3 py-2 px-4 mt-4 mb-4"
          >
            Ažuriraj Prikolicu
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormaZaUpdatePrikolice;
