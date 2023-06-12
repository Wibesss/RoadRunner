import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { Image } from "react-native";

const DispecerPrihvaceneTureVozaciListItem = ({
  item,
  checked,
  toggleOdabranaStavka,
}) => {
  const [vozacOcene, setVozacOcene] = useState("");
  const { user, setUser } = useContext(UserContext);
  const handleCheckboxChange = () => {
    toggleOdabranaStavka(item.vozac.id);
  };
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  useEffect(() => {
    if (user) {
      axios
        .get(`/Vozac/GetSrednjuOcenu/${item.vozac.id}`, config)
        .then((response) => {
          setVozacOcene(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [item]);
  return (
    <tr className="bg-white border-b">
      <td className="p-4 whitespace-nowrap">
      <div className="flex justify-center">
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
          source={{ uri: item.slika }}
        />
        </div>
      </td>
      <td className="p-4 whitespace-nowrap">{item.vozac.ime}</td>
      <td className=" p-4 whitespace-nowrap">{item.vozac.prezime}</td>
      <td className="p-4 whitespace-nowrap">{item.vozac.email}</td>
      <td className=" p-4 whitespace-nowrap">{item.vozac.korisnickoIme}</td>
      <td className=" p-4 whitespace-nowrap">{item.vozac.brojTelefona}</td>
      <td className="p-4 whitespace-nowrap">{vozacOcene.srednja}</td>
      <td className="p-4 whitespace-nowrap">{item.generisanaCena}</td>
      <td className="p-4 whitespace-nowrap">{item.marka}</td>
      <td className="p-4 whitespace-nowrap">{item.model}</td>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        ></input>
      </td>
    </tr>
  );
};

export default DispecerPrihvaceneTureVozaciListItem;
