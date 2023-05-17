import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";

const VozacOcene = () => {
  const { user } = useContext(UserContext);
  const [ocene, setOcene] = useState([]);
  const [ready, setReady] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  axios.get(`/Vozac/GetOcene/${user.id}`, config).then((response) => {
    setOcene(response.data);
    console.log(response.data);
    setReady(true);
  });
  return (
    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {ready &&
        ocene.map((ocena) => {
          <li class="pb-3 sm:pb-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {ocena?.kompanija.naziv}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {ocena?.opis}
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {ocena?.broj}
              </div>
            </div>
          </li>;
        })}
    </ul>
  );
};

export default VozacOcene;
