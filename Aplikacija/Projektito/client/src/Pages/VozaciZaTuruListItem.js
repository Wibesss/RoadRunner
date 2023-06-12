import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { useState } from "react";

const VozaciZaTuruListItem = ({ item, onClick, selectedVozac }) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };

  const [ocene, setOcene] = useState([]);
  const [oceneReady, setOceneReady] = useState(false);
  useEffect(() => {
    (async function pom() {
      try {
        const response = await axios.get(
          `/Vozac/GetSrednjuOcenu/${item.vozac.id}`,
          config
        );
        setOcene(response.data);
        setOceneReady(true);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    })();
  }, [item.vozac.id, selectedVozac]);

  const linkClasses = () => {
    let classes =
      "w-full h-fit mx-2 max-w-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50";
    if (item.vozac.id === selectedVozac)
      classes =
        "w-full h-fit mx-2 max-w-sm bg-white border-4  border-gray-200 rounded-lg hover:bg-gray-50  ";
    return classes;
  };

  if (oceneReady && ocene.srednja !== undefined) {
    return (
      <div className={linkClasses()} onClick={() => onClick(item.vozac.id)}>
        <div className="flex  justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg z-10"
            src={item.vozac.slika}
            alt=""
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            {item.vozac.ime + " " + item.vozac.prezime}
          </h5>
          <span className="text-sm text-gray-500 ">
            {item.korisnickoIme}
          </span>
          <div className="flex flex-col mt-4 space-x-3 md:mt-6 w-5/6">
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                {<Rating name="read-only" value={ocene.srednja} readOnly />}
              </div>
              <p className="ml-2  font-medium text-gray-900 ">
                {ocene.srednja} / 5
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500 ">
              Ukupno {ocene.ukupniBrojOcena} ocena
            </p>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 ">
                5
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded  ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojPetica}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600  mr-auto">
                {`${ocene.brojPetica}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 ">
                4
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojCetvorke}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600  mr-auto">
                {`${ocene.brojCetvorke}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 ">
                3
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojTrojki}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 ">
                {`${ocene.brojTrojki}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 ">
                2
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojDvojki}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 ">
                {`${ocene.brojDvojki}%`}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm font-medium text-blue-600 ">
                1
              </span>
              <div className="w-full h-5 mx-2 bg-gray-200 rounded ">
                <div
                  className="h-5 bg-yellow-400 rounded"
                  style={{
                    width: `${ocene.brojJedinica}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-600 ">
                {`${ocene.brojJedinica}%`}
              </span>
            </div>
          </div>
          <p>Cena:{item.generisanaCena}</p>
        </div>
      </div>
    );
  }
};

export default VozaciZaTuruListItem;
