import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import LoadingPage from "./LoadingPage";
import { Image } from "react-native";

const VozacOcene = () => {
  const { user } = useContext(UserContext);
  const [ocene, setOcene] = useState([]);
  const [ready, setReady] = useState(false);
  const [value, setValue] = React.useState();
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  useEffect(() => {
    axios
      .get(`/Vozac/GetOcene/${user.id}`, config)
      .then((response) => {
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
        setReady(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [currentPage, ready]);
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
  const flip = true;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!ready) {
    return <LoadingPage />;
  } else
    return (
      <div className="flex flex-col items-center mt-2 w-full">
        <div className="flex justify-center items-center rounded-md  mt-4">
          <button
            type="button"
            className="px-4 py-2 h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md"
            onClick={handleClickPrev}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              fill={"black"}
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <p className="px-4 py-2 text-xl font-bold text-gray-900 bg-white">
            {currentPage}
          </p>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
            onClick={handleClickNext}
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              fill={"black"}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col flex-grow w-full items-center overflow-x-auto gap-2 mt-2">
          {ready &&
            currentItems.map((ocena) => (
              <div class="shadow-lg border w-4/5 sm:w-1/3">
                <div class="border-b  border-gray-400 lg:border-l-0  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div class="mb-8">
                    <div class="text-gray-900 font-bold text-xl mb-2 flex justify-center">
                      <Rating value={ocena.broj} readOnly />
                    </div>
                    <p class="text-gray-700 text-base flex justify-center">
                      {ocena.opis}
                    </p>
                  </div>
                  <div class="flex items-center">
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                      source={{ uri: ocena.kompanija.logo }}
                    />
                    <div class="ml-4 text-xl">
                      <p class="text-gray-900 leading-none">
                        {ocena.kompanija.naziv}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
};

export default VozacOcene;
