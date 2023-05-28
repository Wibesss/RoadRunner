import React from 'react'
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

const DispecerNoveTureVozaciListItem = ({item , checked ,toggleOdabranaStavka}) => {
    const [vozacOcene,setVozacOcene] = useState("");
    const {user, setUser } = useContext(UserContext);
    const handleCheckboxChange = () => {
        toggleOdabranaStavka(item.id);
      };
    const config = {
        headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
      };
    useEffect(() => {
        if(user)
          {
          try{
            axios.get(`/Vozac/GetSrednjuOcenu/${item.id}`, config).then((response) => {
              setVozacOcene(response.data);
            });
          }
          catch(err)
          {
            console.log(err.message)
          } 
      }        
      }, [item]);
    return (
        <tr className="bg-white border-b">
          <td className="p-4 whitespace-nowrap"> <img src={item.slika} className='w-12 h-12' alt="Driver Svg Icon" /></td>
          <td className="p-4 whitespace-nowrap">
            {item.ime}
          </td>
          <td className=" p-4 whitespace-nowrap">
            {item.prezime}
          </td>
          <td className=" p-4 whitespace-nowrap">
            {item.jmbg}
          </td>
          <td className="p-4 whitespace-nowrap">
            {item.email}
          </td>
          <td className=" p-4 whitespace-nowrap">
            {item.korisnickoIme}
          </td>
          <td className=" p-4 whitespace-nowrap">{item.brojTelefona}</td>
          <td className="p-4 whitespace-nowrap">{vozacOcene.srednja}</td>
          <td>
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange}></input>
          </td>
        </tr>
      )
}

export default DispecerNoveTureVozaciListItem
