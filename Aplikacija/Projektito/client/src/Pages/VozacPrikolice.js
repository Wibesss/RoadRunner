import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import FormaZaDodavanjePrikolice from "./FormaZaDodavanjePrikolice";
import VozilaListItem from "./VozilaListItem";
import { v4 } from "uuid";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FormaZaUpdatePrikolice from "./FormaZaUpdatePrikolice";
import PrikoliceListItem from "./PrikoliceListItem";
import LoadingPage from "./LoadingPage";

const VozacPrikolice = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user } = useContext(UserContext);
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const [currentItemsReady, setCurrentItemsReady] = useState(false);
  const [formaZaDodavanjePrikolice, setFormaZaDodavanjePrikolice] =
    useState(false);
  const [dodato, setDodato] = useState(false);
  const [obrisano, setObrisano] = useState(false);
  const [formaZaUpdatePrikolice, setFormaZaUpdatePrikolice] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [azurirano, setAzurirano] = useState(false);
  const [tip, setTip] = useState("");
  const [zapremina, setZapremina] = useState(0);
  const [duzina, setDuzina] = useState(0);
  const [sirina, setSirina] = useState(0);
  const [visina, setVisina] = useState(0);
  const [nosivost, setNosivost] = useState(0);
  const [tablice, setTablice] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get(`/Prikolica/GetPrikolica/${user.id}`, config)
      .then((response) => {
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
        setCurrentItemsReady(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [currentItemsReady, dodato, currentPage, obrisano, azurirano]);

  const handleDelete = (id) => {
    axios
      .delete(`/Prikolica/DeletePrikolica/${id}`, config)
      .then(() => {
        setObrisano(!obrisano);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  let photourl = "";
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setFormaZaDodavanjePrikolice(!FormaZaDodavanjePrikolice);
      if (photo === null) {
      } else {
        const imageRef = ref(storage, `prikolice/${photo.name + v4()}`);
        uploadBytes(imageRef, photo).then(() => {
          getDownloadURL(imageRef).then((res) => {
            photourl = res;
            axios
              .post(
                `Prikolica/AddPrikolica/${user.id}/${tip}`,
                {
                  zapremina: zapremina,
                  duzina: duzina,
                  sirina: sirina,
                  visina: visina,
                  nosivost: nosivost,
                  tablice: tablice,
                  slika: photourl,
                },
                config
              )
              .then(() => {
                setFormaZaDodavanjePrikolice(!formaZaDodavanjePrikolice);
                setDodato(!dodato);
              })
              .catch((err) => {
                console.log(err.message);
              });
          });
        });
      }
    } catch (ex) {
      console.log("ERROR: " + ex.message);
    }
  };
  const handleUpdateForm = (e) => {
    setTip(currentItems.filter((x) => x.id.toString() === e.target.id)[0].tip);
    setZapremina(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].zapremina
    );
    setSirina(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].sirina
    );
    setVisina(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].visina
    );
    setNosivost(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].nosivost
    );
    setTablice(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].tablice
    );
    setPhoto(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].slika
    );
    setTip(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0]
        .tipPrikolice.tip
    );
    formaZaDodavanjePrikolice && setFormaZaDodavanjePrikolice(false);
    if (lastUpdate === e.target.id) {
      setLastUpdate(e.target.id);
      setFormaZaUpdatePrikolice(!formaZaUpdatePrikolice);
    } else {
      setLastUpdate(e.target.id);
      setFormaZaUpdatePrikolice(true);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (typeof photo === "string") {
      axios
        .put(
          `Prikolica/UpdatePrikolica/${lastUpdate}/${tip}`,
          {
            zapremina: zapremina,
            duzina: duzina,
            sirina: sirina,
            visina: visina,
            nosivost: nosivost,
            tablice: tablice,
            slika: photo,
          },
          config
        )
        .then(() => {
          setFormaZaUpdatePrikolice(!formaZaUpdatePrikolice);
          setAzurirano(!azurirano);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      const imageRef = ref(storage, `vozila/${photo.name + v4()}`);
      uploadBytes(imageRef, photo).then(() => {
        getDownloadURL(imageRef).then((res) => {
          photourl = res;
          axios
            .put(
              `Prikolica/UpdatePrikolica/${lastUpdate}/${tip}`,
              {
                zapremina: zapremina,
                duzina: duzina,
                sirina: sirina,
                visina: visina,
                nosivost: nosivost,
                tablice: tablice,
                slika: photourl,
              },
              config
            )
            .then(() => {
              setFormaZaUpdatePrikolice(!formaZaUpdatePrikolice);
              setAzurirano(!azurirano);
            });
        });
      });
    }
  };
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
  const handleDodajClick = () => {
    formaZaUpdatePrikolice && setFormaZaUpdatePrikolice(false);
    setFormaZaDodavanjePrikolice(!formaZaDodavanjePrikolice);
  };
  if (!currentItemsReady) {
    return <LoadingPage />;
  } else
    return (
      <div className="flex overflow-hidden w-full m-5 flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="flex justify-center w-4/5 sm:w-1/4">
            <button
              type="submit"
              className="btn-prim w-full"
              onClick={(e) => {
                handleDodajClick();
              }}
            >
              Dodaj Novu Prikolicu
            </button>
          </div>
          {formaZaDodavanjePrikolice && (
            <FormaZaDodavanjePrikolice
              handleSubmit={handleSubmit}
              setTip={setTip}
              setZapremina={setZapremina}
              setNosivost={setNosivost}
              setDuzina={setDuzina}
              setSirina={setSirina}
              setVisina={setVisina}
              setTablice={setTablice}
              setPhoto={setPhoto}
              photo={photo}
              tip={tip}
            />
          )}
          {formaZaUpdatePrikolice && (
            <FormaZaUpdatePrikolice
              handleUpdate={handleUpdate}
              setTip={setTip}
              setZapremina={setZapremina}
              setNosivost={setNosivost}
              setDuzina={setDuzina}
              setSirina={setSirina}
              setVisina={setVisina}
              setTablice={setTablice}
              setPhoto={setPhoto}
              tip={tip}
              zapremina={zapremina}
              nosivost={nosivost}
              duzina={duzina}
              sirina={sirina}
              visina={visina}
              tablice={tablice}
              photo={photo}
            />
          )}
        </div>
        <div className="flex justify-center items-center rounded-md  mt-4">
          <button
            type="button"
            className="px-4 py-2 h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md"
            onClick={handleClickPrev}
            disabled={currentPage === 1}
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
            {currentPage}
          </p>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
            onClick={handleClickNext}
            disabled={currentPage === totalPages}
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
        <div className="overflow-x-auto">
          <table className="w-4/5 bg-white text-left text-sm text-gray-500 rounded-lg border border-gray-200 shadow-md ml-auto mr-auto">
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {currentItemsReady &&
                currentItems.map((prikolica) => (
                  <PrikoliceListItem
                    prikolica={prikolica}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdateForm}
                    key={prikolica.id}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default VozacPrikolice;
