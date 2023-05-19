import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import FormaZaDodavanjeVozila from "./FormaZaDodavanjeVozila";
import VozilaListItem from "./VozilaListItem";
import { v4 } from "uuid";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FormaZaUpdateVozila from "./FormaZaUpdateVozila";

const VozacVozila = () => {
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
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [cena, setCena] = useState(0);
  const [tablice, setTablice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [formaZaDodavanje, setFormaZaDodavanje] = useState(false);
  const [dodato, setDodato] = useState(false);
  const [obrisano, setObrisano] = useState(false);
  const [formaZaUpdateVozila, setFormaZaUpdateVozila] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [azurirano, setAzurirano] = useState(false);
  useEffect(() => {
    axios.get(`/Vozilo/GetVozilo/${user.id}`, config).then((response) => {
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
      setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, dodato, currentPage, obrisano, azurirano]);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleUpdateForm = (e) => {
    setPhoto(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].slika
    );
    setCena(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0]
        .cenaPoKilometru
    );
    setModel(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].model
    );
    setMarka(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].marka
    );
    setTablice(
      currentItems.filter((x) => x.id.toString() === e.target.id)[0].tablice
    );
    formaZaDodavanje && setFormaZaDodavanje(false);
    if (lastUpdate === e.target.id) {
      setLastUpdate(e.target.id);
      setFormaZaUpdateVozila(!formaZaUpdateVozila);
    } else {
      setLastUpdate(e.target.id);
      setFormaZaUpdateVozila(true);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (typeof photo === "string") {
      axios
        .put(
          `Vozilo/UpdateVozilo/${lastUpdate}`,
          {
            cenaPoKilometru: cena,
            marka: marka,
            model: model,
            slika: photo,
            tablice: tablice,
          },
          config
        )
        .then(() => {
          setFormaZaUpdateVozila(!formaZaUpdateVozila);
          setAzurirano(!azurirano);
        });
    } else {
      const imageRef = ref(storage, `vozila/${photo.name + v4()}`);
      uploadBytes(imageRef, photo).then(() => {
        getDownloadURL(imageRef).then((res) => {
          photourl = res;
          axios
            .put(
              `Vozilo/UpdateVozilo/${lastUpdate}`,
              {
                cenaPoKilometru: cena,
                marka: marka,
                model: model,
                slika: photourl,
                tablice: tablice,
              },
              config
            )
            .then(() => {
              setFormaZaUpdateVozila(!formaZaUpdateVozila);
              setAzurirano(!azurirano);
            });
        });
      });
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let photourl = "";
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setFormaZaDodavanje(!FormaZaDodavanjeVozila);
      if (photo === null) {
      } else {
        const imageRef = ref(storage, `vozila/${photo.name + v4()}`);
        uploadBytes(imageRef, photo).then(() => {
          getDownloadURL(imageRef).then((res) => {
            photourl = res;
            axios
              .post(
                `Vozilo/AddVozilo/${user.id}`,
                {
                  cenaPoKilometru: cena,
                  marka: marka,
                  model: model,
                  slika: photourl,
                  tablice: tablice,
                },
                config
              )
              .then(() => {
                setFormaZaDodavanje(!formaZaDodavanje);
                setDodato(!dodato);
              });
          });
        });
      }
    } catch (ex) {
      console.log("ERROR: " + ex.message);
    }
  };
  const handleDodajClick = () => {
    formaZaUpdateVozila && setFormaZaUpdateVozila(false);
    setFormaZaDodavanje(!formaZaDodavanje);
  };

  const handleDelete = (id) => {
    axios.delete(`/Vozilo/DeleteVozilo/${id}`, config).then(() => {
      setObrisano(!obrisano);
    });
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
            Dodaj Novo Vozilo
          </button>
        </div>
        {formaZaDodavanje && (
          <FormaZaDodavanjeVozila
            handleSubmit={handleSubmit}
            setModel={setModel}
            setMarka={setMarka}
            setCena={setCena}
            setTablice={setTablice}
            setPhoto={setPhoto}
          />
        )}
        {formaZaUpdateVozila && (
          <FormaZaUpdateVozila
            handleUpdate={handleUpdate}
            setModel={setModel}
            setMarka={setMarka}
            setCena={setCena}
            setTablice={setTablice}
            setPhoto={setPhoto}
            model={model}
            marka={marka}
            cena={cena}
            tablice={tablice}
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
      <table className="w-3/5  bg-white text-left text-sm text-gray-500 rounded-lg border border-gray-200 shadow-md  ml-auto mr-auto">
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {ready &&
            currentItems.map((vozilo) => (
              <VozilaListItem
                vozilo={vozilo}
                handleDelete={handleDelete}
                handleUpdate={handleUpdateForm}
                key={vozilo.id}
              ></VozilaListItem>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VozacVozila;
