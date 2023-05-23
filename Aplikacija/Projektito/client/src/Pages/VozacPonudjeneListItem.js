import React from "react";

const VozacPonudjeneListItem = ({ item }) => {
  const handleClick = () => {};
  return (
    <tr className="bg-white border-b">
      <td className="p-4 whitespace-nowrap">{item.tipRobe}</td>
      <td className="p-4 whitespace-nowrap">
        {item.tezinaRobe === null ? "-" : item.tezinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.duzinaRobe === null ? "-" : item.duzinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.sirinaRobe === null ? "-" : item.sirinaRobe}
      </td>
      <td className="p-4 whitespace-nowrap">
        {item.visinaRobe === null ? "-" : item.visinaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">
        {item.zapreminaRobe === null ? "-" : item.zapreminaRobe}
      </td>
      <td className=" p-4 whitespace-nowrap">{`${item.pocetnaGeografskaSirina},${item.pocetnaGeografskaDuzina} `}</td>
      <td className=" p-4 whitespace-nowrap">{`${item.odredisnaGeografskaSirina},${item.odredisnaGeografskaDuzina} `}</td>
      <td className=" p-4 whitespace-nowrap">{item.status}</td>
      <td className=" p-4 whitespace-nowrap">{item.duzina}</td>
      <td className="p-4 whitespace-nowrap">{item.datumPocetka}</td>
      <td className="p-4 whitespace-nowrap">{item.predvidjeniKraj}</td>
      <td className="p-4 whitespace-nowrap">{item.kompanijaNaziv}</td>
      <td className="flex items-center px-6 py-4 space-x-3 whitespace-nowrap">
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => handleClick()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default VozacPonudjeneListItem;
