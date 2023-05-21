import React from "react";

const FormaZaUpdateVozila = ({
  handleUpdate,
  setModel,
  setMarka,
  setCena,
  setTablice,
  setPhoto,
  model,
  marka,
  cena,
  tablice,
}) => {
  return (
    <div className=" w-3/5 overflow-hidden rounded-lg shadow-md m-5 ">
      <form
        className="mt-10  bg-white text-left text-sm text-gray-500  border border-gray-200 shadow-md p-5"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-6">
          <input
            value={marka}
            className=""
            type="text"
            required
            onChange={(e) => {
              setMarka(e.target.value);
            }}
          ></input>
          <input
            value={model}
            className=""
            type="text"
            placeholder="Model"
            required
            onChange={(e) => {
              setModel(e.target.value);
            }}
          ></input>
          <input
            value={cena}
            className=""
            type="number"
            placeholder="Cena po km"
            required
            onChange={(e) => {
              setCena(e.target.value);
            }}
          ></input>
          <input
            value={tablice}
            className=""
            type="text"
            placeholder="Reg. tablice"
            required
            onChange={(e) => {
              setTablice(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex justify-center">
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          ></input>
        </div>
        <div className="flex justify-center">
          <button type="submit " className="btn-primary py-2 px-4 mt-5">
            Azuriraj Vozilo
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormaZaUpdateVozila;
