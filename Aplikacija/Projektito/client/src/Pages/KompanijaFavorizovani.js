import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import FavorizacijaListItem from "./FavorizacijaListItem";

const KompanijaFavorizovani = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user } = useContext(UserContext);
  const [ready, setReady] = useState(false);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const [oceneReady, setOceneReady] = useState(false);
  const [obrisano, setObrisano] = useState(false);

  useEffect(() => {
    axios
      .get(`/Kompanija/GetFavorizacije/${user.id}`, config)
      .then((response) => {
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
        if (
          response.data.slice(indexOfFirstItem, indexOfLastItem).length === 0 &&
          currentPage !== 1
        )
          setCurrentPage(currentPage - 1);
        setReady(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, obrisano]);

  const handleOdfavorizuj = (idVozaca) => {
    axios
      .delete(`Kompanija/BrisanjeFavorizovanog/${user?.id}/${idVozaca}`, config)
      .then((response) => {
        if (response.status === 200) {
          setObrisano(!obrisano);
        } else alert("Doslo je do greske!");
      });
  };
  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="inline-flex rounded-md shadow-sm mt-auto">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={handleClickPrev}
          disabled={currentPage === 1}
        >
          <p className="font-bold text-xl">{"<"}</p>
        </button>
        <p className="px-4 py-2 text-xl font-bold text-gray-900 bg-white border-t border-b border-gray-200 ">
          {currentPage}
        </p>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={handleClickNext}
          disabled={currentPage === totalPages}
        >
          <p className="font-bold text-xl">{">"}</p>
        </button>
      </div>
      <p className="text-2xl w-2/3 text-center py-4">Favorizovani Vozaci</p>
      <div className="w-1/2 flex flex-wrap justify-center gap-5">
        {ready &&
          currentItems.map((item, ind) => (
            <FavorizacijaListItem
              item={item}
              oceneReady={oceneReady}
              setOceneReady={setOceneReady}
              user={user}
              key={ind}
              setObrisano={setObrisano}
              obirsano={obrisano}
              handleDelete={handleOdfavorizuj}
            />
          ))}
      </div>
    </div>
  );
};

export default KompanijaFavorizovani;
