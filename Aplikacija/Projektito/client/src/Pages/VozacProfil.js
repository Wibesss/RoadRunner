import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import LoadingPage from "./LoadingPage";
import { Image } from "react-native";

import { Modal } from "react-bootstrap";

const VozacProfil = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [vozac, setVozac] = useState([]);
  const [vozacReady, setVozacReady] = useState(false);
  const [promenaSifre, setPromenasifre] = useState(false);
  const [edit, setEdit] = useState(false);

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [slika, setSlika] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);

  const [staraSifra, setStaraSifra] = useState("");
  const [novaSifra, setNovaSifra] = useState("");
  const [potvrdaSifra, setPotvrdaSifra] = useState("");

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const token = `Bearer ${Cookies.get("Token")}`;
  useEffect(() => {
    axios.get(`/Vozac/GetVozaca/${user.id}`, config).then((response) => {
      setVozac(response.data);
      setVozacReady(true);
      setIme(response.data.ime);
      setPrezime(response.data.prezime);
      setBrojTelefona(response.data.brojTelefona);
      setJmbg(response.data.jmbg);
      setEmail(response.data.email);
      setKorisnickoIme(response.data.korisnickoIme);
    });
  }, [updateUser]);

 
  if (ready && !user) {
    return <Navigate to={redirect} />;
  }

  const handleLogout = async () => {
    try {
      axios.post("/Login/SadCeDaNestanem", {}, config).then(() => {
        setUser(null);
        setRedirect("/");
      });
    } catch (err) {
      console.log("Error:" + err.message);
    }
  };

  const handlePotrvdu = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = {};

      if (ime.length < 3 || ime.length > 30 || !/^[a-zA-Z]+$/.test(ime)) {
        validationErrors.Ime =
          "Ime treba da ima između 3 i 30 karaktera i sadrži samo slovne karaktere.";
      }

      if (
        prezime.length < 3 ||
        prezime.length > 30 ||
        !/^[a-zA-Z]+$/.test(prezime)
      ) {
        validationErrors.Prezime =
          "Prezime treba da ima između 3 i 30 karaktera i sadrži samo slovne karaktere.";
      }

      if (jmbg.length !== 13 || !/^\d+$/.test(jmbg)) {
        validationErrors.JMBG = "JMBG treba da ima tačno 13 cifara.";
      }

      if (
        email.length < 6 ||
        email.length > 30 ||
        !/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
          email
        )
      ) {
        validationErrors.Email =
          "Email treba da bude između 6 i 30 karaktera i u validnom formatu.";
      }

      if (
        korisnickoIme.length < 1 ||
        korisnickoIme.length > 20 ||
        !/^[a-zA-Z][a-zA-Z0-9]*$/.test(korisnickoIme)
      ) {
        validationErrors.KorisnickoIme =
          "Korisničko ime treba da ima između 1 i 20 karaktera i može sadržati samo slovne karaktere i brojeve.";
      }
      if (!/^\+?[0-9][0-9\s.-]{7,11}$/.test(brojTelefona)) {
        validationErrors.Broj =
          "Broj mora da se sastoji samo od cifara i mora da ih bude od 7 do 11.";
      }

      if (Object.keys(validationErrors).length > 0) {
        Object.keys(validationErrors).forEach((property) => {
          setStringGreska(
            `Greška u polju ${property}: ${validationErrors[property]}`
          );
          setShowAlert(true);
        });
        return;
      }
      if (slika === null) {
        try {
          const response = await axios.put(
            `/Vozac/UpdateVozac/${vozac.id}`,
            {
              ime: ime,
              prezime: prezime,
              jmbg: jmbg,
              email: email,
              korisnickoIme: korisnickoIme,
              sifra: "",
              brojTelefona: brojTelefona,
              slika: vozac.slika,
            },
            config
          );

          if (response.status === 200) {
            setUpdateUser(!updateUser);
          } else {
            console.log("Server returned status code " + response.status);
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data;
            if (errorMessage === "Vec postoji nalog sa tim emailom") {
              setStringGreska("Vec postoji nalog sa tim emailom.");
              setShowAlert(true);
            } else if (
              errorMessage === "Vec postoji nalog sa tim korisnickim imenom"
            ) {
              setStringGreska("Vec postoji nalog sa tim korisnickim imenom.");
              setShowAlert(true);
            } else {
              console.log(errorMessage);
            }
          } else {
            console.log("Error:", error.message);
          }
        }
      } else {
        const imageRef = ref(storage, `vozaci/${slika.name + v4()}`);
        let slikaurl = "";
        uploadBytes(imageRef, slika).then(() => {
          getDownloadURL(imageRef).then((res) => {
            slikaurl = res;
            try {
              const response = axios.put(
                `/Vozac/UpdateVozac/${vozac.id}`,
                {
                  ime: ime,
                  prezime: prezime,
                  jmbg: jmbg,
                  email: email,
                  korisnickoIme: korisnickoIme,
                  sifra: "",
                  brojTelefona: brojTelefona,
                  slika: slikaurl,
                },
                config
              );

              if (response.status === 200) {
                setUpdateUser(!updateUser);
              } else {
                console.log("Server returned status code " + response.status);
              }
            } catch (error) {
              if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;
                if (errorMessage === "Vec postoji nalog sa tim emailom") {
                  setStringGreska("Vec postoji nalog sa tim emailom");
                  setShowAlert(true);
                } else if (
                  errorMessage === "Vec postoji nalog sa tim korisnickim imenom"
                ) {
                  setStringGreska(
                    "Vec postoji nalog sa tim korisnickim imenom"
                  );
                  setShowAlert(true);
                } else {
                  console.log(errorMessage);
                }
              } else {
                console.log("Error:", error.message);
              }
            }
          });
        });
      }
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setEdit(!edit);
      setSlika(null);
    }
  };

  const handleEdit = () => {
    setIme(vozac.ime);
    setPrezime(vozac.prezime);
    setBrojTelefona(vozac.brojTelefona);
    setJmbg(vozac.jmbg);
    setEmail(vozac.email);
    setKorisnickoIme(vozac.korisnickoIme);
    setEdit(!edit);
  };

  const handlePromenaSifre = () => {
    if (novaSifra !== potvrdaSifra) {
      setStringGreska("Nova i potrvrdna šifra se ne poklapaju.");
      setShowAlert(true);
    } else {
      try {
        const encodedStaraSifra = encodeURIComponent(staraSifra);
        const encodedNovaSifra = encodeURIComponent(novaSifra);
        console.log(`${encodedStaraSifra} i ${encodedNovaSifra}`);
        axios
          .put(
            `/Vozac/UpdateSifra/${vozac.id}/${encodedStaraSifra}/${encodedNovaSifra}`,
            {},
            config
          )
          .then((response) => {
            if (!response.ok) {
              console.log("Server returned status code " + response.status);
            }
            handleLogout();
          });
      } catch (err) {
        console.log("Error: " + err.message);
      }
    }
  };

  const handleClose = () => {
    setShowAlert(false);
    if (stringGreska !== "Nova i potrvrdna šifra se ne poklapaju")
      window.location.reload();
  };

  if (!ready && !vozacReady) {
    return <LoadingPage />;
  } else
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

        <form className="w-2/3 file-upload" autoComplete="off">
          <div>
            <div className="flex flex-col justify-center items-center sm:flex-row">
              <div className="flex flex-wrap justify-center mb-5 gap-5 w-2/3">
                <button
                  type="button"
                  className="btn-danger btn-xl sm:mb-5 h-15 min-w-[30px]"
                  onClick={handleLogout}
                >
                  Odjavi Se
                </button>
                <button
                  type="button"
                  className="btn-prim btn-xl sm:mb-5 h-15 min-w-[30px]"
                  onClick={() => setPromenasifre(!promenaSifre)}
                >
                  Promeni Šifru
                </button>
                <button
                  type="button"
                  className="btn-prim btn-xl sm:mb-5 h-15 min-w-[30px]"
                  onClick={handleEdit}
                >
                  Izmeni Profil
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="">
              <h4 className="text-xl font-bold mb-10">Profilna Slika</h4>
              <div className="text-center">
                <div className="w-52 h-52 mx-auto relative mb-20 flex justify-center items-center">
                  <Image
                    style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
                    source={{ uri: vozac.slika }}
                  />
                </div>
                <input
                  type="file"
                  id="customFile"
                  name="file"
                  onChange={(e) => {
                    setSlika(e.target.files[0]);
                  }}
                  hidden
                  autoComplete="off"
                />
                {edit && (
                  <>
                    <label className="btn-prim " htmlFor="customFile">
                      Izaberi Novu Sliku
                    </label>
                    <p className="text-muted mt-3 mb-0">
                      {slika === null ? "" : `Izabrana slika:${slika.name}`}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-xl font-bold mb-4">Detalji Profila</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Ime</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder=""
                    aria-label="Ime"
                    disabled={!edit}
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block mb-1">Prezime</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder=""
                    aria-label="Prezime"
                    disabled={!edit}
                    value={prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block mb-1">Broj Telefona</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder=""
                    aria-label="Broj telefona"
                    disabled={!edit}
                    value={brojTelefona}
                    onChange={(e) => setBrojTelefona(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block mb-1">JMBG</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder=""
                    aria-label="JMBG"
                    disabled={!edit}
                    value={jmbg}
                    onChange={(e) => setJmbg(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    id="inputEmail4"
                    disabled={!edit}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block mb-1">Korisničko Ime</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder=""
                    aria-label="Korisnicko Ime"
                    disabled={!edit}
                    value={korisnickoIme}
                    onChange={(e) => setKorisnickoIme(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              {edit && (
                <div className="flex flex-col sm:flex-row sm:justify-center gap-y-2 gap-x-5 items-center sm:mt-5 mt-2">
                  <button
                    type="button"
                    className="btn-prim btn-xl sm:w-1/3  sm:mb-2 h-15 min-w-[30px]"
                    onClick={handleEdit}
                  >
                    Poništi Izmene
                  </button>
                  <button
                    type="button"
                    className="btn-danger btn-xl sm:w-1/3 sm:mb-2 h-15 min-w-[30px]"
                    onClick={handlePotrvdu}
                  >
                    Potvrdi izmene
                  </button>
                </div>
              )}
            </div>
          </div>

          {promenaSifre && (
            <div className="flex justify-center">
              <div className="p-4 gap-4 sm:w-2/5">
                <h4 className="text-xl font-bold mb-4 ">Promena Šifre</h4>
                <div>
                  <label htmlFor="exampleInputPassword1" className="block mb-1">
                    Stara Šifra
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    id="exampleInputPassword1"
                    autoComplete="off"
                    value={staraSifra}
                    onChange={(e) => setStaraSifra(e.target.value)}
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
                    autoComplete="off"
                    value={novaSifra}
                    onChange={(e) => setNovaSifra(e.target.value)}
                  />
                  <label htmlFor="exampleInputPassword3" className="block mb-1">
                    Potvrdi Šifru
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    id="exampleInputPassword3"
                    autoComplete="off"
                    value={potvrdaSifra}
                    onChange={(e) => setPotvrdaSifra(e.target.value)}
                  />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="btn-prim btn-xl sm:mb-5 h-15 min-w-[30px]"
                      onClick={handlePromenaSifre}
                    >
                      Potvrdi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </>
    );
};

export default VozacProfil;
