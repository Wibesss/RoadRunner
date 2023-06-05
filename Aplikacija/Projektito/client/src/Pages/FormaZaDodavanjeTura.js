import React, { useState } from "react";
import { forwardRef } from "react";
import { DatePicker } from "@mui/x-date-pickers";
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
      <div ref={ref} className="flex flex-col w-full items-center">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handlePotvrdiDodavanje}
        >
          <div className="grid grid-cols-2 w-1/2">
            <label className="mx-2 my-2 text-right">Tip robe:</label>
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
              className="mx-2 my-2"
              required
              onChange={(e) => {
                setTezina(e.target.value);
              }}
            ></input>
            <input
              type="number"
              placeholder="Duzina(cm)"
              className="mx-2 my-2"
              onChange={(e) => {
                setDuzina(e.target.value);
              }}
              required
            ></input>
            <input
              type="number"
              placeholder="Sirina(cm)"
              className="mx-2 my-2"
              onChange={(e) => {
                setSirina(e.target.value);
              }}
              required
            ></input>
            <input
              type="number"
              placeholder="Visina(cm)"
              className="mx-2 my-2"
              onChange={(e) => {
                setVisina(e.target.value);
              }}
              required
            ></input>
            <input
              type="number"
              placeholder="Zapremina(l)"
              className="mx-2 my-2"
              onChange={(e) => {
                setZapremina(e.target.value);
              }}
              required
            ></input>
            <LocalizationProvider dateAdapter={AdapterDayjs} required>
              <DatePicker
                label="Datum pocetka"
                onChange={(newValue) => setDatumPocetka(newValue.toDate())}
                required
              />
            </LocalizationProvider>
          </div>
          <Mapa
            setPgs={setPgs}
            setPgd={setPgd}
            setOgs={setOgs}
            setOgd={setOgd}
            setDuzinaTure={setDuzinaTure}
          />
          <button type="submit" className="btn-primary my-2">
            Dodaj
          </button>
        </form>
      </div>
    );
  }
);

export default FormaZaDodavanjeTura;
