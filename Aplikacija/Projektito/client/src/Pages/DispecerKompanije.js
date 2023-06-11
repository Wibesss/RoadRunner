import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import DispecerKompanijaListItem from "./DispecerKompanijaListItem";
import LoadingPage from "./LoadingPage";

const DispecerKompanije = () => {
  const { user, setUser } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [currentItems, setCurrentItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [obrisano, setObrisano] = useState(false);
  useEffect(() => {
    if (user) {
      try {
        axios.get(`/Kompanija/GetKompanije`, config).then((response) => {
          setCurrentItems(response.data);
          setReady(true);
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [ready, user, obrisano]);
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
  const handleDelete = (kompanijaId) => {
    if (user) {
      try {
        axios
          .delete(`/Kompanija/DeleteKompanija/${kompanijaId}`, config)
          .then((response) => {
            console.log(response.data);
            setObrisano(true);
          });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  if (!ready) {
    return <LoadingPage />;
  } else {
    return (
      <div className="flex flex-col mt-8 items-center">
        <div className="overflow-auto w-2/3 sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500  shadow-md ">
            <thead className="text-xs text-white uppercase bg-primary">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row">Logo</div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <button
                    className="flex flex-row uppercase"
                    onClick={() => sorting("tipRobe")}
                  >
                    Naziv
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
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <button
                    className="flex flex-row uppercase"
                    onClick={() => sorting("sirinaRobe")}
                  >
                    Email
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
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  <button
                    className="flex flex-row uppercase"
                    onClick={() => sorting("visinaRobe")}
                  >
                    Korisnicko ime
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
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <button
                    className="flex flex-row uppercase"
                    onClick={() => sorting("zapremina")}
                  >
                    Adresa
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
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <button
                    className="flex flex-row uppercase"
                    onClick={() => sorting("duzina")}
                  >
                    Vlasnik
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
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex flex-row">Obrisi</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-center">
              {currentItems.map((item, ind) => (
                <DispecerKompanijaListItem
                  item={item}
                  key={ind}
                  handleDelete={handleDelete}
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
      </div>
    );
  }
};

export default DispecerKompanije;
