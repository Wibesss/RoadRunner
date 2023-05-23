import React from "react";
import { forwardRef } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";

const FormaZaDodavanjeTura = forwardRef(({ tipovi }, ref) => (
  <div ref={ref} className="flex flex-col w-full items-center">
    <form className="grid grid-cols-2">
      <label className="mx-2 my-2 text-right">Tip robe:</label>
      <select>
        {tipovi.map((tip) => (
          <option value={tip}>{tip}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Tezina(kg)"
        className="mx-2 my-2"
      ></input>
      <input
        type="number"
        placeholder="Duzina(cm)"
        className="mx-2 my-2"
      ></input>
      <input
        type="number"
        placeholder="Sirina(cm)"
        className="mx-2 my-2"
      ></input>
      <input
        type="number"
        placeholder="Visina(cm)"
        className="mx-2 my-2"
      ></input>
      <input
        type="number"
        placeholder="Zapremina(l)"
        className="mx-2 my-2"
      ></input>
      <DateTimePicker
        label="Datum pocetka"
        // value={value}
        // onChange={(newValue) => setValue(newValue)}
      />
    </form>
  </div>
));

export default FormaZaDodavanjeTura;
