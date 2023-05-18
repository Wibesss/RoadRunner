import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const VozacOcene = () => {
  const { user } = useContext(UserContext);
  const [ocene, setOcene] = useState([]);
  const [ready, setReady] = useState(false);
  const [value, setValue] = React.useState();
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  useEffect(()=> {
    axios.get(`/Vozac/GetOcene/${user.id}`, config).then((response) => {
      setOcene(response.data);
      setReady(true);
    });
  },[])
  return (
    <div className="flex flex-col items-center mt-20">
      <ul class="w-2/3 divide-y divide-gray-200 dark:divide-gray-700">
        {ready &&
          ocene.map((ocena) => (
            <li class="pb-3 sm:pb-4">
              <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                  <p>Slika</p>
              </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
                    Kompanija: {ocena?.kompanija.naziv}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    Opis: {ocena?.opis}
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">
                  {
                    <Box
                    sx={{
                      '& > legend': { mt: 2 },
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
            </li>
          ))}
      </ul>
    </div>
  );
};

export default VozacOcene;
