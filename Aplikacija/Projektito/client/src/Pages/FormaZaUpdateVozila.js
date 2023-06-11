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
  photo
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center sm:w-3/5 overflow-hidden rounded-lg shadow-md ">
      <form
        className="p-2 sm:p-4 mt-6 w-4/5 sm:w-full bg-white text-left text-sm text-gray-500  border border-gray-200 shadow-md"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        <div className="flex justify-center mt-2">
          <input
            type="file"
            id="customFilePhoto"
            name="file"
            required
            placeholder={"Photo"}
            onChange={(e) => setPhoto(e.target.files[0])}
            hidden
            autoComplete="off"
          />
          <div className="flex flex-col justify-center items-center">
            <label
              className="btn-prim w-40 flex flex-row justify-center items-center"
              htmlFor="customFilePhoto"
            >
              Izaberi Sliku
            </label>
            <p className="text-muted mb-0">
              {photo === null ? "" : photo.name === undefined? " slika nije izabrana" : `Izabrana slika:${photo.name}`}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit " className="btn-prim sm:w-1/3 py-2 px-4 mt-4 mb-4">
            Ažuriraj Vozilo
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormaZaUpdateVozila;
