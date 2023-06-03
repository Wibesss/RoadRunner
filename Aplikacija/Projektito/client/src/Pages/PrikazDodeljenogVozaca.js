import React from "react";

const PrikazDodeljenogVozaca = ({ vozac }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 border border-gray-400 shadow-md p-4">
      <div className="">
        <div className="text-center">
          <img className="w-48 h-48  mx-auto" src={vozac.vozac.slika} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mx-10 ">
        <div>
          <label className="block mb-1">
            Ime i prezime: {vozac.vozac.ime} {vozac.vozac.prezime}
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Broj telefona: {vozac.vozac.brojTelefona}
          </label>
        </div>
        <div>
          <label className="block mb-1">Email: {vozac.vozac.email}</label>
        </div>
        <div>
          <label className="block mb-1">
            Korisnicko ime: {vozac.vozac.korisnickoIme}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrikazDodeljenogVozaca;
