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
        <div className="inline-flex rounded-md shadow-sm mt-auto">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
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
          <p className="px-4 py-2 text-xl font-bold text-gray-900 bg-white border-t border-b border-gray-200 ">
            {currentPage}
          </p>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
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
        <div className="flex flex-grow w-full justify-center overflow-x-auto">
          <table className="w-2/3 divide-y divide-gray-200 dark:divide-gray-700">
            {ready &&
              currentItems.map((ocena) => (
                <th className="pb-2 sm:pb-4">
                  <div className="flex flex-col sm:flex-row items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 200 / 2,
                        }}
                        source={{ uri: ocena.kompanija.logo }}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center flex-grow min-w-0 w-96">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
                        Kompanija: {ocena?.kompanija.naziv}
                      </p>
                      <div className="flex flex-row flex-wrap w-full">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Opis: {ocena?.opis}
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">
                      {
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Typography component="legend">Ocena:</Typography>
                          <Rating
                            name="read-only"
                            value={ocena?.broj}
                            readOnly
                          />
                        </Box>
                      }
                    </div>
                  </div>
                </th>
              ))}
          </table>
        </div>
      </div>
    );
};

export default VozacOcene;
