import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

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
    axios.get(`/Vozac/GetOcene/${user.id}`, config).then((response) => {
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
      setReady(true);
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
  return (
    <div className="flex flex-col items-center mt-2 w-full">
      <div className="flex justify-center gap-5 mt-10">
        <button onClick={handleClickPrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleClickNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <ul className="w-2/3 divide-y divide-gray-200 dark:divide-gray-700">
        {ready &&
          currentItems.map((ocena) => (
            <li className="pb-3 sm:pb-4" key={ocena.id}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                <img src={ocena.kompanija.logo} className='w-12 h-12' alt="Driver Svg Icon" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
                    Kompanija: {ocena?.kompanija.naziv}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Opis: {ocena?.opis}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">
                  {
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Typography component="legend">Ocena:</Typography>
                      <Rating name="read-only" value={ocena?.broj} readOnly />
                    </Box>
                  }
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default VozacOcene;
