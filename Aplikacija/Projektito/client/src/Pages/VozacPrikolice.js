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

const VozacPrikolice = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user } = useContext(UserContext);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const [ready, setReady] = useState(false);
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
    axios.get(`/Prikolica/GetPrikolica/${user.id}`, config).then((response) => {
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
      setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, dodato, currentPage, obrisano, azurirano]);

  const handleDelete = (id) => {
    axios.delete(`/Prikolica/DeletePrikolica/${id}`, config).then(() => {
      setObrisano(!obrisano);
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
    console.log(
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
      console.log("STRING JE");
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
        });
    } else {
      console.log("STRING NIJE");
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

  return (
    <div className=" overflow-hidden w-full m-5 flex-col">
      <div className="flex flex-col  items-center mt-10">
        <div className="flex justify-center w-1/2">
          <button
            type="submit"
            className="btn-primary py-2 px-4"
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
      <div className="flex justify-center gap-5 mt-10">
        <button onClick={handleClickPrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleClickNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <table className="w-3/5  bg-white text-left text-sm text-gray-500 rounded-lg border border-gray-200 shadow-md  ml-auto mr-auto border-collapse">
        <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
          {ready &&
            currentItems.map((prikolica) => (
              <PrikoliceListItem
                prikolica={prikolica}
                handleDelete={handleDelete}
                handleUpdate={handleUpdateForm}
                key={prikolica.id}
              ></PrikoliceListItem>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VozacPrikolice;
