import React, { useState } from "react";

import { Modal } from "react-bootstrap";

const KompanijaTuraListItem = ({
  item,
  handleDelete,
  handlePrikazi,
  handlePrikaziVozaca,
  handlePrikaziVozacaZ,
}) => {
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
          <Modal.Title>Brisanje Ture</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da želite da obrišete turu?</Modal.Body>
        <Modal.Footer>
          <button className="btn-prim" onClick={handleClose}>
            Nazad
          </button>
          <button className="btn-danger" onClick={handleObrisi}>
            Obrisi
          </button>
        </Modal.Footer>
      </Modal>


      <tr className="bg-white border-b ">
        <td className="p-4 whitespace-nowrap">{item.tipRobe.tip}</td>
        <td className="p-4 whitespace-nowrap">
          {item.tezinaRobe === null ? "-" : item.tezinaRobe}
        </td>
        <td className=" p-4 whitespace-nowrap">
          {item.visinaRobe === null ? "-" : item.visinaRobe}
        </td>
        <td className=" p-4 whitespace-nowrap">
          {item.duzinaRobe === null ? "-" : item.duzinaRobe}
        </td>
        <td className="p-4 whitespace-nowrap">
          {item.sirinaRobe === null ? "-" : item.sirinaRobe}
        </td>
        <td className=" p-4 whitespace-nowrap">
          {item.zapremina === null ? "-" : item.zapremina}
        </td>
        <td className=" p-4 whitespace-nowrap">{item.status}</td>
        <td className="p-4 whitespace-nowrap">{item.datumPocetka}</td>
        <td className="p-4 whitespace-nowrap">{item.duzina}</td>
        <td className="p-4 whitespace-nowrap">
          {item.status === "Slobodna" && (
            <button
              className="font-medium text-blue-400"
              onClick={() => {
                handlePrikazi(item.id);
              }}
            >
              Izaberi
            </button>
          )}
          {item.status === "Dodeljena" && (
            <button
              className="font-medium"
              onClick={() => {
                handlePrikaziVozaca(item.id);
              }}
            >
              Proveri
            </button>
          )}
          {item.status === "Zavrsena" && (
            <button
              className="font-medium text-green-400"
              onClick={() => {
                handlePrikaziVozacaZ(item.id);
              }}
            >
              Oceni
            </button>
          )}
        </td>
        <td>
          <button
            className="font-medium text-red-600 hover:underline"
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

export default KompanijaTuraListItem;
