import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const FormaZaDodavanjePrikolice = ({
        handleSubmit,
        setTip,
        setZapremina,
        setNosivost,
        setDuzina,
        setSirina,
        setVisina,
        setTablice,
        setPhoto,
      }) => {
        const config = {
          headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
        };
        const [tipovi,setTipovi]=useState([]);
        useEffect(() => {
          axios.get(`/Prikolica/GetTipPrikolica`, config).then((response) => {
            console.log(response.data)
            setTipovi(response.data);
          });
          },[]);
        return ( 
        <div className=" w-3/5 overflow-hidden rounded-lg shadow-md m-5 ">
        <form
          className="mt-10  bg-white text-left text-sm text-gray-500  border border-gray-200 shadow-md p-5"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6">
            <label htmlFor="TipPrikolice">TipPrikolice</label>
            <select onChange={(e)=>setTip(e.target.value)} id="TipPrikolice">
            <option>
                  "Izaberi tip"
                </option>
              {tipovi.map(tip => (
                <option key={tip.tip} value={tip.tip}>
                  {tip.tip}
                </option>
              ))}
            </select>
            <input
              className=""
              type="number"
              placeholder="Zapremina"
              required
              onChange={(e) => {
                setZapremina(e.target.value);
              }}
            ></input>
            <input
              className=""
              type="number"
              placeholder="Nosivost"
              required
              onChange={(e) => {
                setNosivost(e.target.value);
              }}
            ></input>
            <input
              className=""
              type="number"
              placeholder="Duzina"
              required
              onChange={(e) => {
                setDuzina(e.target.value);
              }}
            ></input>
            <input
              className=""
              type="number"
              placeholder="Sirina"
              required
              onChange={(e) => {
                setSirina(e.target.value);
              }}
            ></input>
            <input
              className=""
              type="number"
              placeholder="Visina"
              required
              onChange={(e) => {
                setVisina(e.target.value);
              }}
            ></input>
            <input
              className=""
              type="text"
              placeholder="Tablice"
              required
              onChange={(e) => {
                setTablice(e.target.value);
              }}
            ></input>
            <input
              className=""
              type="file"
              placeholder="Photo"
              required
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
            ></input>
          </div>
          <div className="flex justify-center">
            <button type="submit " className="btn-primary py-2 px-4 mt-5">
              Dodaj Prikolicu
            </button>
          </div>
        </form>
      </div>
    );
        
};
export default FormaZaDodavanjePrikolice;
