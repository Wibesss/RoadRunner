import React, { useState } from "react";
import { Image } from "react-native";
import { Modal } from "react-bootstrap";

const VozilaListItem = ({ vozilo, handleDelete, handleUpdate }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShowAlert(false);
  const handleObrisi = () => {
    handleDelete(vozilo.id);
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
          <Modal.Title>Brisanje Vozila</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da želite da obrišete vozilo?</Modal.Body>
        <Modal.Footer>
          <button className="btn-prim" onClick={handleClose}>
            Nazad
          </button>
          <button className="btn-danger" onClick={handleObrisi}>
            Obrisi
          </button>
        </Modal.Footer>
      </Modal>

      <tr className="hover:bg-gray-50 h-40">
        <td className=" h-full w-1/5 px-14 font-normal text-gray-900 ">
          <div className="flex justify-center">
            <Image
              style={{ width: 100, height: 100, borderRadius: 200 / 2 }}
              source={{ uri: vozilo.slika }}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm">
            <div className="font-medium text-gray-700">{vozilo.marka}</div>
            <div className="text-gray-400">{vozilo.model}</div>
          </div>
        </td>
        <td className="px-6 py-4">{vozilo.tablice}</td>

        <td className="px-6 py-4">{vozilo.cenaPoKilometru}</td>

        <td className="px-6 py-4">
          <div className="flex justify-end gap-4">
            <button
              id={vozilo.id}
              className="text-green-400"
              onClick={(e) => {
                handleUpdate(e);
              }}
              x-data="{ tooltip: 'Edite' }"
            >
              <svg
                id={vozilo.id}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  id={vozilo.id}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              type="submit"
              x-data="{ tooltip: 'Delete' }"
              className="text-red-600"
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
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default VozilaListItem;
