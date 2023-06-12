import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import VozacDodeljeneListItem from "./VozacDodeljeneListItem";
import MapePrihvaceneTure from "./MapePrihvaceneTure";
import LoadingPage from "./LoadingPage";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import MissingPage from "./MissingPage";

const VozacDodeljene = () => {
  const { user, setUser } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [currentItems, setCurrentItems] = useState([]);
  const [ready, setReady] = useState(false);
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
  const [lastUpdate, setLastUpdate] = useState(0);

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`/Tura/GetDodeljenaTuraVozac/${user.id}`, config)
        .then((response) => {
          setCurrentItems(response.data);
          setReady(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [ready, user, obrisano, stanje]);

  const token = `Bearer ${Cookies.get("Token")}`;

  useEffect(() => {
    let connection;
    if (ready && user.role === "Vozac") {
      connection = new HubConnectionBuilder()
        .withUrl(
          `http://localhost:5026/notificationHub?username=${user.korisnickoIme}`,
          {
            accessTokenFactory: () => token,
          }
        )
        .build();

      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            toast(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              css: `
              background-color: white;
              `,
            });
          });
        })
        .catch((error) => {});
    }
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [ready]);

  if (user?.role.toString() !== "Vozac") {
    return <MissingPage />;
  }

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
  const handleStart = (id) => {
    axios
      .put(`/Tura/ZapocniTuru/${id}`, {}, config)
      .then((response) => {
        const prom = stanje + 1;
        setStanje(prom);
        toast("Tura zapoceta!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          css: `
          background-color: white;
          `,
        });
      })
      .catch((err) => {
        setStringGreska(`Error: + ${err.message}`);
        setShowAlert(true);
      });
  };
  const handleEnd = (id) => {
    axios
      .put(`/Tura/ZavrsiTuru/${id}`, {}, config)
      .then((response) => {
        const prom = stanje + 1;
        setStanje(prom);
        toast("Tura zavrsena!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          css: `
          background-color: white;
          `,
        });
      })
      .catch((err) => {
        setStringGreska(`Error: + ${err.message}`);
        setShowAlert(true);
      });
  };

  const handleClose = () => setShowAlert(false);

  if (!ready) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <Modal
          show={showAlert}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Greška!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{stringGreska}</Modal.Body>
          <Modal.Footer>
            <button className="btn-prim" onClick={handleClose}>
              Zatvori
            </button>
          </Modal.Footer>
        </Modal>

        <div className="flex flex-col items-center mt-10">
          <ToastContainer></ToastContainer>
          <h3 className="text-center text-xl font-bold mb-4">Dodeljene ture</h3>
          <div className="overflow-auto w-full sm:w-4/5 sm:rounded-lg">
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
                        onClick={() => sorting("status")}
                      >
                        Status
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
                      <button
                        className="flex flex-row uppercase"
                        onClick={() => sorting("kompanijaNaziv")}
                      >
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
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    <div className="flex flex-row justify-center">Vozilo</div>
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    <div className="flex flex-row justify-center">
                      <button
                        className="flex flex-row uppercase"
                        onClick={() => sorting("cena")}
                      >
                        Cena
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
                    <div className="flex flex-row justify-center">Prikazi</div>
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    <div className="flex flex-row justify-center">Zapocni</div>
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    <div className="flex flex-row justify-center">Zavrsi</div>
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">
                {currentItems.map((item, ind) => (
                  <VozacDodeljeneListItem
                    item={item}
                    key={ind}
                    mapa={mapa}
                    setMapa={setMapa}
                    setTuraId={setTuraId}
                    setPonudjenaTuraId={setPonudjenaTuraId}
                    setPocetnaGS={setPocetnaGS}
                    setPocetnaGD={setPocetnaGD}
                    setKrajnjaGS={setKrajnjaGS}
                    setKrajnjaGD={setKrajnjaGD}
                    handleStart={handleStart}
                    handleEnd={handleEnd}
                    lastUpdate={lastUpdate}
                    setLastUpdate={setLastUpdate}
                  />
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <th colSpan="10" className="text-center">
                      Nemate aktivnih ruta
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {mapa && (
            <MapePrihvaceneTure
              pocetnaGS={pocetnaGS}
              pocetnaGD={pocetnaGD}
              krajnjaGS={krajnjaGS}
              krajnjaGD={krajnjaGD}
            />
          )}
        </div>
      </>
    );
  }
};

export default VozacDodeljene;
