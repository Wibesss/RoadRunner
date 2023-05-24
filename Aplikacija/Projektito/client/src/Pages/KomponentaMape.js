import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const KomponentaMape = ({vozacId,turaId,ponudjenaTuraId,pocetnaGS,pocetnaGD,krajnjaGS,krajnjaGD ,setObrisano}) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [auta,setAuta] = useState([]);
  const [auto,setAuto] = useState(null)
  useEffect(()=>{
    axios.get(`/Vozilo/GetVozilo/${vozacId}`, config).then((response) => {
      setAuta(response.data);
    });
  },[])
  const handlePrihvati = () => {
    if(auto!==null)
    {
      try{
        axios.post(`Tura/AddPrihvacenaTura/${ponudjenaTuraId}/${auto}`, config).then((response) => {
        });
        axios.delete(`Tura/DeletePonudjenaTura/${turaId}/${vozacId}`, config).then((response) => {
          setObrisano(true);
        });
       }
       catch(err)
       {
          alert(err.message)
       }
    }
    else{
      alert("Niste izabrali auto");
    }
  }
  return (
    <div className="fle flex-col">
      {auta.length>0 ? (
        <div className="flex flex-row gap-4">
            <select onChange={(e) => setAuto(e.target.value)} id="TipPrikolice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="default">
              Izaberi auto
            </option>
              {auta.map((aut) => (
                <option key={aut.id} value={aut.id} >
                  {aut.marka}  {aut.model}  {aut.tablice}
                </option>
              ))}
            </select>
            <button className="btn-primary" onClick={handlePrihvati}>
              Prihvati Turu
            </button>
        </div>
        ): "dati vozac ne poseduje auta"
      }
    </div>
  )
}

export default KomponentaMape