import React, { useState } from "react";
import { Image } from "react-native";
import { Modal } from "react-bootstrap";

const DispecerKompanijaListItem = ({ item, handleDelete }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShowAlert(false);
  const handleObrisi = () => {
    handleDelete(item.id);
    setShowAlert(false);
  };

  return (
    <>
      <Modal
        show={showAlert}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Brisanje Kompanije</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Da li ste sigurni da želite da obrišete kompaniju?
        </Modal.Body>
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
          <div className="flex justify-center">
            <Image
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
              source={{ uri: item.logo }}
            />
          </div>
        </td>
        <td className="p-4 whitespace-nowrap">{item.naziv}</td>
        <td className="p-4 whitespace-nowrap">{item.email}</td>
        <td className=" p-4 whitespace-nowrap">{item.korisnickoIme}</td>
        <td className=" p-4 whitespace-nowrap">{item.adresa}</td>
        <td className="p-4 whitespace-nowrap">{item.vlasnik}</td>
        <td>
          <button
            className="font-medium text-red-500"
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

export default DispecerKompanijaListItem;
