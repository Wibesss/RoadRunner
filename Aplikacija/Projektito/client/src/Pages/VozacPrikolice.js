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
      console.log(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
      setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, dodato, currentPage, obrisano, azurirano]);

  const handleDelete = (id) => {
    axios.delete(`/Prikolica/DeltePrikolica/${id}`, config).then(() => {
      setObrisano(!obrisano);
    });
  };
  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   if (typeof photo === "string") {
  //     axios
  //       .put(
  //         `Vozilo/UpdateVozilo/${lastUpdate}`,
  //         {
  //           cenaPoKilometru: cena,
  //           marka: marka,
  //           model: model,
  //           slika: photo,
  //           tablice: tablice,
  //         },
  //         config
  //       )
  //       .then(() => {
  //         setFormaZaUpdateVozila(!formaZaUpdateVozila);
  //         setAzurirano(!azurirano);
  //       });
  //   } else {
  //     const imageRef = ref(storage, `vozila/${photo.name + v4()}`);
  //     uploadBytes(imageRef, photo).then(() => {
  //       getDownloadURL(imageRef).then((res) => {
  //         photourl = res;
  //         axios
  //           .put(
  //             `Vozilo/UpdateVozilo/${lastUpdate}`,
  //             {
  //               cenaPoKilometru: cena,
  //               marka: marka,
  //               model: model,
  //               slika: photourl,
  //               tablice: tablice,
  //             },
  //             config
  //           )
  //           .then(() => {
  //             setFormaZaUpdateVozila(!formaZaUpdateVozila);
  //             setAzurirano(!azurirano);
  //           });
  //       });
  //     });
  //   }
  // };
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
    //formaZaUpdatePrikolce && setFormaZaUpdatePrikolice(false);
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
        {formaZaDodavanjePrikolice && <FormaZaDodavanjePrikolice />}
        {formaZaUpdatePrikolice && <FormaZaUpdatePrikolice />}
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
            currentItems.map((prikolica) => (
              <PrikoliceListItem
                prikolica={prikolica}
                handleDelete={handleDelete}
                // handleUpdate={handleUpdateForm}
                key={prikolica.id}
              ></PrikoliceListItem>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default VozacPrikolice;
