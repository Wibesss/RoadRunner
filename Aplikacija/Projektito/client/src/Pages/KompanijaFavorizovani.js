import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import FavorizacijaListItem from "./FavorizacijaListItem";
import { Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import MissingPage from "./MissingPage";

const KompanijaFavorizovani = () => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const { user } = useContext(UserContext);
  const [ready, setReady] = useState(false);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const [oceneReady, setOceneReady] = useState(false);
  const [obrisano, setObrisano] = useState(false);

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios
      .get(`/Kompanija/GetFavorizacije/${user.id}`, config)
      .then((response) => {
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
        setCurrentItems(response.data.slice(indexOfFirstItem, indexOfLastItem));
        if (
          response.data.slice(indexOfFirstItem, indexOfLastItem).length === 0 &&
          currentPage !== 1
        )
          setCurrentPage(currentPage - 1);
        setReady(true);
      })
      .catch((err) => {
        setStringGreska(`Error: + ${err.message}`);
        setShowAlert(true);
      });
  }, [currentPage, obrisano]);

  if (ready && !user) {
    return <Navigate to="/" />;
  }

  const handleOdfavorizuj = (idVozaca) => {
    axios
      .delete(`Kompanija/BrisanjeFavorizovanog/${user?.id}/${idVozaca}`, config)
      .then((response) => {
        if (response.status === 200) {
          setObrisano(!obrisano);
        } else {
          setStringGreska(
            "Doslo je do greske pri brisanju fovorizovanog vozača!"
          );
          setShowAlert(true);
        }
      })
      .catch((err) => {
        setStringGreska(`Error: + ${err.message}`);
        setShowAlert(true);
      });
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

  const handleClose = () => setShowAlert(false);

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

      <div className="w-full flex flex-col items-center relative">
        <div className="flex justify-center items-center rounded-md mt-auto">
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
            className="px-4 py-2 h-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-md"
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
        <p className="text-2xl w-2/3 text-center py-4">Favorizovani Vozaci</p>
        <div className="w-1/2 flex flex-wrap justify-center gap-5">
          {ready &&
            currentItems.map((item, ind) => (
              <FavorizacijaListItem
                item={item}
                oceneReady={oceneReady}
                setOceneReady={setOceneReady}
                user={user}
                key={ind}
                setObrisano={setObrisano}
                obirsano={obrisano}
                handleDelete={handleOdfavorizuj}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default KompanijaFavorizovani;
