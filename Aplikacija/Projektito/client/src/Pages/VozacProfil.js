import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";

const VozacProfil = () => {
  const [redirect, setRedirect] = useState(null);
  const [vozac, setVozac] = useState([]);
  const [vozacReady, setVozacReady] = useState(false);
  const [promenaSifre, setPromenasifre] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };

  const { ready, user, setUser } = useContext(UserContext);

  const logout = async () => {
    console.log(config);
    axios.post("/Login/SadCeDaNestanem", {}, config);
    setRedirect("/");
    setUser(null);
  };

  useEffect(() => {
    console.log(user);
    axios.get(`/Vozac/GetVozaca/${user.id}`, config).then((response) => {
      setVozac(response.data);
      setVozacReady(true);
    });
  }, []);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={redirect} />;
  }

  const handlePromenaSifre = () => {
    setPromenasifre(!promenaSifre);
  };

  return (
    <form className="w-2/3 file-upload">
      <div className="flex justify-end mb-5 gap-5">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handlePromenaSifre}
        >
          Promeni Šifru
        </button>
        <button type="button" className="btn btn-primary btn-lg">
          Izmeni Profil
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="bg-secondary-soft rounded p-4">
          <h4 className="text-xl font-bold mb-4">Profilna Slika</h4>
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto relative mb-3">
              <img src={vozac.slika} />
            </div>
            <input type="file" id="customFile" name="file" hidden />
            <label className="btn btn-primary btn-block" htmlFor="customFile">
              Izaveri Novu Sliku
            </label>
            <p className="text-muted mt-3 mb-0">
              <span className="me-1">Note:</span>Minimalna velicina size 300px x
              300px
            </p>
          </div>
        </div>

        <div className="bg-secondary-soft rounded p-4">
          <h4 className="text-xl font-bold mb-4">Detalji Profila</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Ime</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Ime"
                defaultValue="Scaralet"
              />
            </div>
            <div>
              <label className="block mb-1">Prezime</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Prezime"
                defaultValue="Doe"
              />
            </div>
            <div>
              <label className="block mb-1">Broj Telefona</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Broj telefona"
                defaultValue="(333) 000 555"
              />
            </div>
            <div>
              <label className="block mb-1">JMBG</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="JMBG"
                defaultValue="+91 9852 8855 252"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="form-input"
                id="inputEmail4"
                defaultValue="example@homerealty.com"
              />
            </div>
            <div>
              <label className="block mb-1">Korisničko Ime</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Korisnicko Ime"
                defaultValue="Scaralet D"
              />
            </div>
          </div>
        </div>
      </div>

      {promenaSifre && (
        <div className="flex justify-center">
          <div className="bg-gray-200 rounded p-4">
            <h4 className="text-xl font-bold my-4">Promena Šifre</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 h-10 gap-4">
              <div>
                <label htmlFor="exampleInputPassword1" className="block mb-1">
                  Stara Šifra
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="exampleInputPassword1"
                />
              </div>
              <div>
                <label htmlFor="exampleInputPassword2" className="block mb-1">
                  Nova Šifra
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="exampleInputPassword2"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <label htmlFor="exampleInputPassword3" className="block mb-1">
                  Potvrdi Šifru
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="exampleInputPassword3"
                />
                <button
                  type="button"
                  className="w-1/3 self-center btn-primary btn-lg mt-2"
                >
                  Potvrdi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default VozacProfil;
