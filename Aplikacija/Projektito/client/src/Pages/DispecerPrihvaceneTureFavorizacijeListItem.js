import React from "react";
import { Image } from "react-native";
const DispecerPrihvaceneTureFavorizacijeListItem = ({ item }) => {
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
      <td className="p-4 whitespace-nowrap">{item.email}</td>
      <td className=" p-4 whitespace-nowrap">{item.korisnickoIme}</td>
    </tr>
  );
};

export default DispecerPrihvaceneTureFavorizacijeListItem;
