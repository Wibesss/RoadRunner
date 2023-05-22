import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const FavorizacijaListItem = ({
  item,
  oceneReady,
  setOceneReady,
  currentPage,
}) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ocene, setOcene] = useState([]);
  useEffect(() => {
    (async function pom() {
      const response = await axios.get(
        `/Vozac/GetSrednjuOcenu/${item.id}`,
        config
      );
      console.log(response.data);
      setOcene(response.data);
      setOceneReady(true);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  const handleOdfavorizuj = () => {};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (oceneReady && ocene.srednja !== undefined) {
    return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="flex  justify-end px-4 pt-4 relative">
          <button
            id="dropdownMenuIconHorizontalButton"
            data-dropdown-toggle="dropdownDotsHorizontal"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
            onClick={toggleDropdown}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              className="absolute top-10 z-50 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <button
                  className="text-red-500 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-3"
                  onClick={handleOdfavorizuj}
                >
                  Odfavorizuj
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg z-10"
            src={item.slika}
            alt=""
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {item.ime + " " + item.prezime}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {item.korisnickoIme}
          </span>
          <div className="flex flex-col mt-4 space-x-3 md:mt-6 w-5/6">
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">
                {<Rating name="read-only" value={ocene.srednja} readOnly />}
              </div>
              <p className="ml-2  font-medium text-gray-900 dark:text-white">
                {ocene.srednja} / 5
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ukupno {ocene.ukupniBrojOcena} ocena
            </p>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                5
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700 ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojPetica}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500 mr-auto">
                {`${ocene.brojPetica}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                4
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojCetvorke}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500  mr-auto">
                {`${ocene.brojCetvorke}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                3
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojTrojki}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                {`${ocene.brojTrojki}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                2
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojDvojki}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                {`${ocene.brojDvojki}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                1
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojJedinica}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                {`${ocene.brojJedinica}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FavorizacijaListItem;
