import React, { useState } from "react";
import { forwardRef } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Mapa from "./Mapa";

const FormaZaDodavanjeTura = forwardRef(
  (
    {
      tipovi,
      setTip,
      setDuzina,
      setSirina,
      setVisina,
      setTezina,
      setZapremina,
      setPgs,
      setPgd,
      setOgs,
      setOgd,
      setDatumPocetka,
      setDuzinaTure,
      handlePotvrdiDodavanje,
      datumPocetka,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="w-full flex flex-col justify-center items-center sm:w-4/5 overflow-hidden rounded-lg shadow-md"
      >
        <form
          className="p-2 sm:p-4 mt-6 w-full flex flex-col justify-center items-center bg-white text-left text-sm text-gray-500  border border-gray-200 shadow-md"
          onSubmit={handlePotvrdiDodavanje}
        >
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-2">
            <select
              onChange={(e) => {
                setTip(e.target.value);
              }}
              required
            >
              <option value="">Izaberi tip robe</option>
              {tipovi.map((tip) => (
                <option value={tip} key={tip}>
                  {tip}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Tezina(kg)"
              required
              onChange={(e) => {
                setTezina(e.target.value);
              }}
            ></input>
            <input
              type="number"
              placeholder="Duzina(cm)"
              onChange={(e) => {
                setDuzina(e.target.value);
              }}
              required
            ></input>
            <input
              type="number"
              placeholder="Sirina(cm)"
              onChange={(e) => {
                setSirina(e.target.value);
              }}
              required
            ></input>
            <input
              type="number"
              placeholder="Visina(cm)"
              onChange={(e) => {
                setVisina(e.target.value);
              }}
              required
            ></input>
            <input
              type="number"
              placeholder="Zapremina(l)"
              onChange={(e) => {
                setZapremina(e.target.value);
              }}
              required
            ></input>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs} required>
            <DateTimePicker
              label="Datum pocetka"
              onChange={(newValue) => setDatumPocetka(newValue.toDate())}
              required
              className="mt-2 mb-2"
              sx={{ border: "1px solid #7c3aed", borderRadius: "5px" }}
            />
          </LocalizationProvider>
          <div className="flex w-full flex-col justify-center items-center ">
            <Mapa
              setPgs={setPgs}
              setPgd={setPgd}
              setOgs={setOgs}
              setOgd={setOgd}
              setDuzinaTure={setDuzinaTure}
            />
          </div>

          <button type="submit" className="btn-prim my-2">
            Dodaj
          </button>
        </form>
      </div>
    );
  }
);

export default FormaZaDodavanjeTura;
