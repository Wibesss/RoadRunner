import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { Image } from "react-native";
import { Modal } from "react-bootstrap";

const DispecerVozacListItem = ({ item, handleDelete }) => {
  const [vozacOcene, setVozacOcene] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShowAlert(false);
  const handleObrisi = () => {
    handleDelete(item.id);
    setShowAlert(false);
  };
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  useEffect(() => {
    if (user) {
      axios
        .get(`/Vozac/GetSrednjuOcenu/${item.id}`, config)
        .then((response) => {
          setVozacOcene(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [item]);
  return (
    <>
      <Modal
        show={showAlert}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Brisanje Vozača</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da želite da obrišete vozača?</Modal.Body>
        <Modal.Footer>
          <button className="btn-prim" onClick={handleClose}>
            Nazad
          </button>
          <button className="btn-danger" onClick={handleObrisi}>
            Obrisi
          </button>
        </Modal.Footer>
      </Modal>

      <tr className="bg-white border-b">
        <td className="p-4 whitespace-nowrap">
          <Image
            style={{ width: 100, height: 100, borderRadius: 200 / 2 }}
            source={{ uri: item.slika }}
          />
        </td>
        <td className="p-4 whitespace-nowrap">{item.ime}</td>
        <td className=" p-4 whitespace-nowrap">{item.prezime}</td>
        <td className=" p-4 whitespace-nowrap">{item.jmbg}</td>
        <td className="p-4 whitespace-nowrap">{item.email}</td>
        <td className=" p-4 whitespace-nowrap">{item.korisnickoIme}</td>
        <td className=" p-4 whitespace-nowrap">{item.brojTelefona}</td>
        <td className="p-4 whitespace-nowrap">{vozacOcene.srednja}</td>
        <td>
          <button
            className="font-medium text-red-600 "
            onClick={() => {
              setShowAlert(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};

export default DispecerVozacListItem;
