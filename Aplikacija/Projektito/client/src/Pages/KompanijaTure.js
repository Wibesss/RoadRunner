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

const KompanijaTure = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user, ready } = useContext(UserContext);
  const itemsPerPageV = 4;
  const [selectedVozac, setSelectedVozac] = useState(0);
  const [currentPageV, setCurrentPageV] = useState(1);
  const [vozaciCurrent, setVozaciCurrent] = useState([]);
  const [totalPagesV, setTotalPagesV] = useState(0);
  const indexOfLastItemV = currentPageV * itemsPerPageV;
  const indexOfFirstItemV = indexOfLastItemV - itemsPerPageV;
  const [currentItems, setCurrentItems] = useState([]);
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

  const listref = useRef(null);
  const tableRef = useRef(null);
  useEffect(() => {
    if (user) {
      axios
        .get(`/Tura/GetTuraKompanija/${user?.id}`, config)
        .then((response) => {
          setCurrentItems(response.data);
        });
      axios
        .get(`Tura/GetTipTure`, config)
        .then((response) => setTipovi(response.data));

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
      .catch((error) => {
        alert(error.response.data.message);
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
      .catch((error) => {
        alert(error.response.data.message);
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
    try {
      axios
        .post(`Tura/AddDodeljenaTura/${selectedVozac}/${lastTura}`, {}, config)
        .then((response) => {
          if (response.status === 200) {
            setPrikaziVozace(false);
            setObrisano(!obrisano);
          } else
            console.log("Server responded with status code " + response.status);
        });
    } catch (ex) {
      console.log(ex.message);
    }
  };
  const handlePrikaziVozaca = (id) => {
    try {
      setLastTura(id);
      if (lastTura !== id) {
        axios.get(`Tura/GetVozacaZaTuru/${id}`, config).then((response) => {
          setDodeljenVozac(response.data);
          setPrikaziVozaca(true);
          setPrikaziVozace(false);
          setPrikaziVozacaZ(false);
          setFormaZaDodavanjeTure(false);
        });
      } else {
        setPrikaziVozaca(!prikaziVozaca);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handlePrikaziVozacaZ = (id) => {
    try {
      setLastTura(id);
      if (lastTura !== id) {
        axios.get(`Tura/GetVozacaZaTuru/${id}`, config).then((response) => {
          setVozacZ(response.data);
          setPrikaziVozaca(false);
          setPrikaziVozace(false);
          setFormaZaDodavanjeTure(false);
          setPrikaziVozacaZ(true);
        });
      } else {
        setPrikaziVozacaZ(!prikaziVozacaZ);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handlePrikazi = (id) => {
    setLastTura(id);
    if (lastTura !== id) {
      axios.get(`Tura/GetVozaceZaTuru/${id}`, config).then((response) => {
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
      });
    } else {
      setPrikaziVozace(!prikaziVozace);
    }
  };

  const handlePotvrdiDodavanje = (e) => {
    e.preventDefault();
    try {
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
            console.log(
              "Server responded with status code: " + response.status
            );
          setFormaZaDodavanjeTure(false);
          if (tableRef.current)
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        });
    } catch (Ex) {
      console.log(Ex.message);
    }
  };

  const handleSelected = (id) => {
    setSelectedVozac(id);
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`Tura/DeleteTura/${id}`, config).then((response) => {
        if (response.status === 200) {
          setObrisano(!obrisano);
        } else
          console.log("Server responded with status code: " + response.status);
      });
    } catch (Ex) {
      console.log(Ex.message);
    }
  };

  if (!ready) {
    return "Loading...";
  } else {
    return (
      <div className="flex flex-col">
        <ToastContainer></ToastContainer>
        <div className="flex flex-col">
          <div className="w-full min-h-fill overflow-y-auto sm:rounded-lg">
            <div className=" overflow-y-auto sm:rounded-lg">
              <table
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md "
                ref={tableRef}
              >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <button
              className="btn-primary mx-2 my-2"
              onClick={handleDodajClick}
            >
              Nova Tura
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 ml-4 flex-wrap ">
            {vozaciCurrent?.length !== 0 ? (
              <div className="flex justify-center gap-5 mt-10 flex-wrap">
                <button onClick={handleClickPrev} disabled={currentPageV === 1}>
                  Previous
                </button>
                <span>{currentPageV}</span>
                <button
                  onClick={handleClickNext}
                  disabled={currentPageV === totalPagesV}
                >
                  Next
                </button>
              </div>
            ) : (
              lastTura !== 0 &&
              prikaziVozace && (
                <h1 className="text-center text-2xl">
                  ZA SADA NEMA VOZACA KOJI SU PRIHVATILI TURU!
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
                <button className="btn-primary w-1/6" onClick={handleIzaberi}>
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
    );
  }
};

export default KompanijaTure;
