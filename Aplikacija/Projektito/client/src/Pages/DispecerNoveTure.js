import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import DispecerNoveTureListItem from "./DispecerNoveTureListItem";
import MapeDispecer from "./MapeDispecer";
import DispecerNoveTureVozaci from "./DispecerNoveTureVozaci";
import LoadingPage from "./LoadingPage";
import MissingPage from "./MissingPage";
import { Navigate } from "react-router-dom";
const DispecerNoveTure = () => {
  const {ready, user } = useContext(UserContext);

  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [currentItems, setCurrentItems] = useState([]);
  const [readyI, setReadyI] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [mapa, setMapa] = useState(false);
  const [turaId, setTuraId] = useState("");
  const [ponudjenaTuraId, setPonudjenaTuraId] = useState("");
  const [pocetnaGS, setPocetnaGS] = useState("");
  const [pocetnaGD, setPocetnaGD] = useState("");
  const [krajnjaGS, setKrajnjaGS] = useState("");
  const [krajnjaGD, setKrajnjaGD] = useState("");
  const [stanje, setStanje] = useState(0);
  const [obrisano, setObrisano] = useState(false);
  const [vozaci, setVozaci] = useState("");
  const [poslati, setPoslati] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [lastUpdateVozaci, setLastUpdateVozaci] = useState(0);

  useEffect(() => {
    if (user) {
      axios
        .get(`/Tura/GetNoveTureDispecer`, config)
        .then((response) => {
          setCurrentItems(response.data);
          setReadyI(true);
        })
        .catch((err) => {
          console.log("Error:" + err.message);
        });
    }
  }, [readyI, user, obrisano, stanje, poslati, turaId, mapa]);
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...currentItems].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setCurrentItems(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...currentItems].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setCurrentItems(sorted);
      setOrder("ASC");
    }
  };

  if (ready && !user) {
    return <Navigate to="/" />;
  }

  if (user?.role.toString() !== "Dispecer") {
    return <MissingPage />;
  }

  if (!readyI) {
    return <LoadingPage />;
  } else {
    return (
      <div className="flex flex-col mt-2">
        <h3 className="text-center text-xl font-bold mb-4">Nove ture</h3>
        <div className="overflow-auto w-full sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500  shadow-md ">
            <thead className="text-xs text-white uppercase bg-primary">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("tipRobe")}
                    >
                      Vrsta Robe
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("tezinaRobe")}
                    >
                      Tezina robe
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("duzinaRobe")}
                    >
                      Duzina robe
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("sirinaRobe")}
                    >
                      Sirina robe
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("visinaRobe")}
                    >
                      Visina robe
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("zapremina")}
                    >
                      Zapremina robe
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("duzina")}
                    >
                      Duzina ture
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row justify-center">Status</div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row justify-center">
                    <button
                      className="flex flex-row uppercase"
                      onClick={() => sorting("datumPocetka")}
                    >
                      Datum pocetka
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row justify-center">
                    <button className="flex flex-row uppercase">
                      Ime Kompanije
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1 mb-0"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap justify-center"
                >
                  Prikazi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap justify-center"
                >
                  Vozaci
                </th>
              </tr>
            </thead>

            <tbody className="text-center">
              {currentItems.map((item, ind) => (
                <DispecerNoveTureListItem
                  item={item}
                  key={ind}
                  mapa={mapa}
                  setMapa={setMapa}
                  setTuraId={setTuraId}
                  setPocetnaGS={setPocetnaGS}
                  setPocetnaGD={setPocetnaGD}
                  setKrajnjaGS={setKrajnjaGS}
                  setKrajnjaGD={setKrajnjaGD}
                  vozaci={vozaci}
                  setVozaci={setVozaci}
                  lastUpdate={lastUpdate}
                  setLastUpdate={setLastUpdate}
                  lastUpdateVozaci={lastUpdateVozaci}
                  setLastUpdateVozaci={setLastUpdateVozaci}
                />
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <th colSpan="10" className="text-center">
                    Nema tura
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {mapa && (
          <MapeDispecer
            pocetnaGS={pocetnaGS}
            pocetnaGD={pocetnaGD}
            krajnjaGS={krajnjaGS}
            krajnjaGD={krajnjaGD}
          />
        )}
        {vozaci && (
          <DispecerNoveTureVozaci
            turaId={turaId}
            poslati={poslati}
            setPoslati={setPoslati}
            setVozaci={setVozaci}
            setMapa={setMapa}
          />
        )}
      </div>
    );
  }
};

export default DispecerNoveTure;
