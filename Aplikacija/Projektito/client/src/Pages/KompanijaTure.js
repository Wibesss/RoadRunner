import React, { useState } from "react";
import { useEffect, useContext, useRef } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import KompanijaTuraListItem from "./KompanijaTuraListItem";
import FormaZaDodavanjeTura from "./FormaZaDodavanjeTura";
import { flushSync } from "react-dom";
import VozaciZaTuruListItem from "./VozaciZaTuruListItem";
import PrikazDodeljenogVozaca from "./PrikazDodeljenogVozaca";
import PrikazVozacaZ from "./PrikazVozacaZ";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";

import LoadingPage from "./LoadingPage";
import MissingPage from "./MissingPage";
const KompanijaTure = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user, ready } = useContext(UserContext);
  const itemsPerPageV = 3;
  const [selectedVozac, setSelectedVozac] = useState(0);
  const [currentPageV, setCurrentPageV] = useState(1);
  const [vozaciCurrent, setVozaciCurrent] = useState([]);
  const [totalPagesV, setTotalPagesV] = useState(0);
  const indexOfLastItemV = currentPageV * itemsPerPageV;
  const indexOfFirstItemV = indexOfLastItemV - itemsPerPageV;
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItemsReady, setCurrentItemsReady] = useState(false);
  const [tipovi, setTipovi] = useState([]);
  const [formaZaDodavanjeTure, setFormaZaDodavanjeTure] = useState(false);
  const [tip, setTip] = useState("");
  const [tezina, setTezina] = useState(0);
  const [visina, setVisina] = useState(0);
  const [sirina, setSirina] = useState(0);
  const [duzina, setDuzina] = useState(0);
  const [zapremina, setZapremina] = useState(0);
  const [pgs, setPgs] = useState(0);
  const [pgd, setPgd] = useState(0);
  const [ogs, setOgs] = useState(0);
  const [ogd, setOgd] = useState(0);
  const [datumPocetka, setDatumPocetka] = useState(new Date());
  const [duzinaTure, setDuzinaTure] = useState(0);
  const [dodato, setDodato] = useState(false);
  const [obrisano, setObrisano] = useState(false);
  const [vozaci, setVozaci] = useState();
  const [lastTura, setLastTura] = useState(0);
  const [prikaziVozace, setPrikaziVozace] = useState(false);
  const [prikaziVozaca, setPrikaziVozaca] = useState(false);
  const [dodeljenVozac, setDodeljenVozac] = useState();
  const [prikaziVozacaZ, setPrikaziVozacaZ] = useState(false);
  const [vozacZ, setVozacZ] = useState();
  const [ocenjen, setOcenjen] = useState(false);

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const listref = useRef(null);
  const tableRef = useRef(null);
  useEffect(() => {
    if (user) {
      axios
        .get(`/Tura/GetTuraKompanija/${user?.id}`, config)
        .then((response) => {
          setCurrentItems(response.data);
          setCurrentItemsReady(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
      axios
        .get(`Tura/GetTipTure`, config)
        .then((response) => setTipovi(response.data))
        .catch((err) => {
          console.log(err.message);
        });

      if (lastTura !== 0 && vozaci !== undefined) {
        setVozaciCurrent(vozaci.slice(indexOfFirstItemV, indexOfLastItemV));
      }
    }
  }, [
    ready,
    formaZaDodavanjeTure,
    dodato,
    obrisano,
    vozaci,
    currentPageV,
    selectedVozac,
  ]);
  const handleDodajClick = () => {
    setPrikaziVozaca(false);
    setPrikaziVozace(false);
    setFormaZaDodavanjeTure(!formaZaDodavanjeTure);
    flushSync();
    if (listref.current) listref.current.scrollIntoView({ behavior: "smooth" });
  };

  if (user?.role.toString() !== "Kompanija") {
    return <MissingPage />;
  }

  const handleFavorizuj = (idKomp, idVozac) => {
    axios
      .post(`/Kompanija/FavorizujVozaca/${idKomp}/${idVozac}`, {}, config)
      .then((res) => {
        if (res.status === 200) {
          toast("Vozac uspesno favorizovan!", {
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
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleOceni = (idKomp, idVozac, opis, ocena, idTure, e) => {
    e.preventDefault();
    axios
      .post(
        `Kompanija/OceniVozaca/${idKomp}/${idVozac}/${idTure}`,
        {
          opis: opis,
          broj: ocena,
        },
        config
      )
      .then((res) => {
        toast("Vozac uspesno ocenjen!", {
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
        setOcenjen(!ocenjen);
      })
      .catch((err) => {
        setStringGreska(`Error: + ${err.message}`);
        setShowAlert(true);
      });
  };

  const handleClickPrev = () => {
    if (currentPageV > 1) {
      setCurrentPageV(currentPageV - 1);
    }
  };

  const handleClickNext = () => {
    if (currentPageV < totalPagesV) {
      setCurrentPageV(currentPageV + 1);
    }
  };

  const handleIzaberi = () => {
    axios
      .post(`Tura/AddDodeljenaTura/${selectedVozac}/${lastTura}`, {}, config)
      .then((response) => {
        if (response.status === 200) {
          setPrikaziVozace(false);
          setObrisano(!obrisano);
          window.location.reload();
        } else
          console.log("Server responded with status code " + response.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handlePrikaziVozaca = (id) => {
    setLastTura(id);
    if (lastTura !== id) {
      axios
        .get(`Tura/GetVozacaZaTuru/${id}`, config)
        .then((response) => {
          console.log(response.data);
          setDodeljenVozac(response.data);
          setPrikaziVozaca(true);
          setPrikaziVozace(false);
          setPrikaziVozacaZ(false);
          setFormaZaDodavanjeTure(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setPrikaziVozaca(!prikaziVozaca);
    }
  };

  const handlePrikaziVozacaZ = (id) => {
    setLastTura(id);
    if (lastTura !== id) {
      axios
        .get(`Tura/GetVozacaZaTuru/${id}`, config)
        .then((response) => {
          setVozacZ(response.data);
          setPrikaziVozaca(false);
          setPrikaziVozace(false);
          setFormaZaDodavanjeTure(false);
          setPrikaziVozacaZ(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setPrikaziVozacaZ(!prikaziVozacaZ);
    }
  };

  const handlePrikazi = (id) => {
    setLastTura(id);
    if (lastTura !== id) {
      axios
        .get(`Tura/GetVozaceZaTuru/${id}`, config)
        .then((response) => {
          setVozaci(response.data);
          setTotalPagesV(Math.ceil(response.data.length / itemsPerPageV));
          setVozaciCurrent(
            response.data.slice(indexOfFirstItemV, indexOfLastItemV)
          );
          setPrikaziVozaca(false);
          setPrikaziVozacaZ(false);
          setFormaZaDodavanjeTure(false);
          setPrikaziVozace(true);
          setSelectedVozac(0);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setPrikaziVozace(!prikaziVozace);
    }
  };

  const handlePotvrdiDodavanje = (e) => {
    e.preventDefault();
    axios
      .post(
        `Tura/AddTura/${user.id}/${tip}`,
        {
          tezinaRobe: tezina,
          duzinaRobe: duzina,
          sirinaRobe: sirina,
          visinaRobe: visina,
          zapremina: zapremina,
          pocetnaGeografskaSirina: pgs.toFixed(6),
          pocetnaGeografskaDuzina: pgd.toFixed(6),
          odredisnaGeografskaSirina: ogs.toFixed(6),
          odredisnaGeografskaDuzina: ogd.toFixed(6),
          status: "status",
          datumPocetka: datumPocetka.toISOString().split("T")[0],
          duzina: duzinaTure,
          predvidjeniKraj: "2023-05-24",
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          setDodato(!dodato);
        } else
          console.log("Server responded with status code: " + response.status);
        setFormaZaDodavanjeTure(false);
        if (tableRef.current)
          tableRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSelected = (id) => {
    setSelectedVozac(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`Tura/DeleteTura/${id}`, config)
      .then((response) => {
        if (response.status === 200) {
          setObrisano(!obrisano);
        } else
          console.log("Server responded with status code: " + response.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  

  const handleClose = () => setShowAlert(false);

  if (!ready || !currentItemsReady) {
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
        <div className="flex flex-col items-center justify-center">
          <ToastContainer></ToastContainer>
          <div className="flex flex-grow flex-col mt-10 w-4/5 justify-center items-center">
            <div className="flex flex-col w-full justify-center items-center">
              <div className="w-full min-h-fill flex flex-col justify-center overflow-auto sm:rounded-lg">
                <button
                  className="btn-prim self-center sm:w-1/5 mx-2 my-4"
                  onClick={handleDodajClick}
                >
                  Dodaj Turu
                </button>

                <div className=" overflow-auto sm:rounded-lg">
                  <table
                    className="w-full text-sm text-left text-gray-500  shadow-md "
                    ref={tableRef}
                  >
                    <thead className="text-xs text-white uppercase bg-primary">
                      <tr>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Vrsta robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Tezina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Visina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Duzina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Sirina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Zapremina robe
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Datum pocetka
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Duzina
                        </th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentItems.map((item, ind) => (
                        <KompanijaTuraListItem
                          item={item}
                          handleDelete={handleDelete}
                          handlePrikazi={handlePrikazi}
                          key={ind}
                          handlePrikaziVozaca={handlePrikaziVozaca}
                          handlePrikaziVozacaZ={handlePrikaziVozacaZ}
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
              </div>
              <div className="w-full flex flex-col gap-2 ml-4 flex-wrap ">
                {vozaciCurrent?.length !== 0 ? (
                  <div className="flex justify-center items-center rounded-md mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md"
                      onClick={handleClickPrev}
                      disabled={currentPageV === 1}
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
                      {currentPageV}
                    </p>
                    <button
                      type="button"
                      className="px-4 py-2 h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md"
                      onClick={handleClickNext}
                      disabled={currentPageV === totalPagesV}
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
                ) : (
                  lastTura !== 0 &&
                  prikaziVozace && (
                    <h1 className="text-center text-2xl">
                      Za sada ne postoje vozači koji su prihvatili turu!
                    </h1>
                  )
                )}
                <div className="w-full flex gap flex-wrap justify-around">
                  {prikaziVozace === true &&
                    vozaciCurrent?.map((vozac) => (
                      <VozaciZaTuruListItem
                        item={vozac}
                        key={vozac.id}
                        currentPageV={currentPageV}
                        onClick={handleSelected}
                        selectedVozac={selectedVozac}
                      />
                    ))}
                  {prikaziVozaca === true && (
                    <PrikazDodeljenogVozaca
                      vozac={dodeljenVozac}
                    ></PrikazDodeljenogVozaca>
                  )}
                  {prikaziVozacaZ === true && (
                    <PrikazVozacaZ
                      vozac={vozacZ}
                      handleFavorizuj={handleFavorizuj}
                      handleOceni={handleOceni}
                      user={user}
                      ocenjen={ocenjen}
                      lastTura={lastTura}
                    ></PrikazVozacaZ>
                  )}
                </div>
                {selectedVozac !== 0 && prikaziVozace === true && (
                  <div className="flex justify-center">
                    <button
                      className="btn-prim sm:w-1/6"
                      onClick={handleIzaberi}
                    >
                      Izaberi
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center ">
              {formaZaDodavanjeTure && (
                <FormaZaDodavanjeTura
                  ref={listref}
                  tipovi={tipovi}
                  setTip={setTip}
                  setDuzina={setDuzina}
                  setSirina={setSirina}
                  setVisina={setVisina}
                  setTezina={setTezina}
                  setZapremina={setZapremina}
                  setPgs={setPgs}
                  setPgd={setPgd}
                  setOgs={setOgs}
                  setOgd={setOgd}
                  setDatumPocetka={setDatumPocetka}
                  setDuzinaTure={setDuzinaTure}
                  handlePotvrdiDodavanje={handlePotvrdiDodavanje}
                  datumPocetka={datumPocetka}
                  tip={tip}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default KompanijaTure;
