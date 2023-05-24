import React, { useState } from "react";
import { useEffect, useContext, useRef } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import KompanijaTuraListItem from "./KompanijaTuraListItem";
import FormaZaDodavanjeTura from "./FormaZaDodavanjeTura";
import { flushSync } from "react-dom";

const KompanijaTure = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user, ready } = useContext(UserContext);
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

  const listref = useRef(null);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, formaZaDodavanjeTure]);
  const handleDodajClick = () => {
    setFormaZaDodavanjeTure(!formaZaDodavanjeTure);
    flushSync();
    if (listref.current) listref.current.scrollIntoView({ behavior: "smooth" });
  };
  const handlePotvrdiDodavanje = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log("Tip:" + tip);
    console.log("Tezina: " + tezina);
    console.log("Sirina: " + sirina);
    console.log("Visina: " + visina);
    console.log("Duzina: " + duzina);
    console.log("Zapremina: " + zapremina);
    console.log("PGS: " + pgs);
    console.log("PGD: " + pgd);
    console.log("OGS: " + ogs);
    console.log("OGD: " + ogd);
    console.log("Datum: " + datumPocetka);
    console.log("Duzina ture: " + duzinaTure);
  };
  if (!ready) {
    return "Loading...";
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex ">
          <div className="w-3/5 min-h-screen overflow-auto sm:rounded-lg">
            <div className=" overflow-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md ">
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
                      Od
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Do
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
                    <KompanijaTuraListItem item={item} key={ind} />
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
          <div className="w-2/5"></div>
        </div>
        <div className="w-full flex justify-center">
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
            />
          )}
        </div>
      </div>
    );
  }
};

export default KompanijaTure;
