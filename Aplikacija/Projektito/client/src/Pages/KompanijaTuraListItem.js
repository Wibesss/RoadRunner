import React from "react";

const KompanijaTuraListItem = ({
  item,
  handleDelete,
  handlePrikazi,
  handlePrikaziVozaca,
  handlePrikaziVozacaZ,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="p-4 whitespace-nowrap">{item.tipRobe.tip}</td>
      <td className="p-4 whitespace-nowrap">
        {item.tezinaRobe === null ? "-" : item.tezinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.visinaRobe === null ? "-" : item.visinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.duzinaRobe === null ? "-" : item.duzinaRobe}
      </td>
      <td className="p-4 whitespace-nowrap">
        {item.sirinaRobe === null ? "-" : item.sirinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.zapremina === null ? "-" : item.zapremina}
      </td>
      <td className=" p-4 whitespace-nowrap">{item.status}</td>
      <td className="p-4 whitespace-nowrap">{item.datumPocetka}</td>
      <td className="p-4 whitespace-nowrap">{item.duzina}</td>
      <td className="flex items-center px-6 py-4 space-x-3 whitespace-nowrap">
        <button
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
          onClick={() => {
            handleDelete(item.id);
          }}
        >
          Obrisi
        </button>
        {item.status === "Slobodna" && (
          <button
            className="font-medium text-blue-400"
            onClick={() => {
              handlePrikazi(item.id);
            }}
          >
            Vozaci
          </button>
        )}
        {item.status === "Dodeljena" && (
          <button
            className="font-medium text-green-400"
            onClick={() => {
              handlePrikaziVozaca(item.id);
            }}
          >
            Vozac
          </button>
        )}
        {item.status === "Zavrsena" && (
          <button
            className="font-medium text-green-400"
            onClick={() => {
              handlePrikaziVozacaZ(item.id);
            }}
          >
            Vozac
          </button>
        )}
      </td>
    </tr>
  );
};

export default KompanijaTuraListItem;
