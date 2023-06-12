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
import MissingPage from "./MissingPage";
import { Modal } from "react-bootstrap";

const AccountDispecer = () => {
  const [redirect, setRedirect] = useState(null);
  const [dispecer, setDispecer] = useState([]);
  const [dispecerReady, setDispecerReady] = useState(false);
  const [promenaSifre, setPromenasifre] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
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

  const { ready, user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    axios
      .post("/Login/SadCeDaNestanem", {}, config)
      .then(() => {
        setUser(null);
        setRedirect("/");
      })
      .catch((err) => {
        console.log("Error:" + err.message);
      });
  };

  useEffect(() => {
    axios
      .get(`/Dispecer/GetDispecer/${user.id}`, config)
      .then((response) => {
        setDispecer(response.data);
        setDispecerReady(true);
        setIme(response.data.ime);
        setPrezime(response.data.prezime);
        setJmbg(response.data.jmbg);
        setEmail(response.data.email);
        setKorisnickoIme(response.data.korisnickoIme);
      })
      .catch((err) => {
        console.log("Error:" + err.message);
      });
  }, [updateUser]);

  if (ready && !user && !redirect) {
    return <Navigate to={redirect} />;
  }


  const handlePotrvdu = (e) => {
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
        axios
          .put(
            `/Dispecer/UpdateDispecer/${dispecer.id}`,
            {
              ime: ime,
              prezime: prezime,
              jmbg: jmbg,
              email: email,
              korisnickoIme: korisnickoIme,
              sifra: "",
              slika: dispecer.slika,
            },
            config
          )
          .then((response) => {
            if (response.ok) {
              setUpdateUser(!updateUser);
            } else {
              console.log("Server returned status code " + response.status);
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 400) {
                const { errors } = error.response.data;
                if (errors) {
                  Object.keys(errors).forEach((property) => {
                    const errorMessage = errors[property][0];
                    switch (property) {
                      case "Ime":
                        setStringGreska(`Greška u polju Ime: ${errorMessage}`);
                        setShowAlert(true);
                        break;
                      case "Prezime":
                        setStringGreska(
                          `Greška u polju Prezime: ${errorMessage}`
                        );
                        setShowAlert(true);
                        break;
                      case "JMBG":
                        setStringGreska(`Greška u polju JMBG: ${errorMessage}`);
                        setShowAlert(true);
                        break;
                      case "Email":
                        setStringGreska(
                          `Greška u polju Email: ${errorMessage}`
                        );
                        setShowAlert(true);
                        break;
                      case "KorisnickoIme":
                        setStringGreska(
                          `Greška u polju Korisničko Ime: ${errorMessage}`
                        );
                        setShowAlert(true);
                        break;
                      default:
                        setStringGreska(
                          `Validation error for ${property}: ${errorMessage}`
                        );
                        setShowAlert(true);
                        break;
                    }
                  });
                }
              } else {
                console.log(
                  "Server returned status code " + error.response.status
                );
              }
            } else if (error.request) {
              console.log("No response received");
            } else {
              console.log("Error:", error.message);
            }
          });
      } else {
        const imageRef = ref(storage, `dispeceri/${slika.name + v4()}`);
        let slikaurl = "";
        uploadBytes(imageRef, slika).then(() => {
          getDownloadURL(imageRef).then((res) => {
            slikaurl = res;
            axios
              .put(
                `/Dispecer/UpdateDispecer/${dispecer.id}`,
                {
                  ime: ime,
                  prezime: prezime,
                  jmbg: jmbg,
                  email: email,
                  korisnickoIme: korisnickoIme,
                  sifra: "",
                  slika: slikaurl,
                },
                config
              )
              .then((response) => {
                if (!response.ok) {
                  console.log("Server returned status code " + response.status);
                }

                setUpdateUser(!updateUser);
              });
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
    setIme(dispecer.ime);
    setPrezime(dispecer.prezime);
    setJmbg(dispecer.jmbg);
    setEmail(dispecer.email);
    setKorisnickoIme(dispecer.korisnickoIme);
    setEdit(!edit);
  };

  const handlePromenaSifre = () => {
    if (novaSifra !== potvrdaSifra) {
      setStringGreska("Nova i potrvrdna šifra se ne poklapaju.");
      setShowAlert(true);
    } else {
      const encodedStaraSifra = encodeURIComponent(staraSifra);
      const encodedNovaSifra = encodeURIComponent(novaSifra);
      axios
        .put(
          `/Dispecer/UpdateSifra/${dispecer.id}/${encodedStaraSifra}/${encodedNovaSifra}`,
          {},
          config
        )
        .then((response) => {
          if (!response.ok) {
            console.log("Server returned status code " + response.status);
          }
          handleLogout();
        })
        .catch((err) => {
          console.log("Error:" + err.message);
        });
    }
  };

  const handleClose = () => {
    setShowAlert(false);
    if (stringGreska !== "Nova i potrvrdna šifra se ne poklapaju.")
      setUpdateUser(!updateUser);
  };

  if (!ready) {
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
            <Modal.Title>Neuspešna Registracija</Modal.Title>
          </Modal.Header>
          <Modal.Body>{stringGreska}</Modal.Body>
          <Modal.Footer>
            <button className="btn-prim" onClick={handleClose}>
              Zatvori
            </button>
          </Modal.Footer>
        </Modal>

        <div className="flex flex-col items-center font-bold pt-4 sm:mt-4">
          <form className="w-2/3 file-upload" autoComplete="off">
            <div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-wrap justify-center mb-5 gap-5 w-full">
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
                      source={{ uri: dispecer.slika }}
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
                      <label className="btn-prim" htmlFor="customFile">
                        Izaberi Novu Sliku
                      </label>
                      <p className="text-muted mt-3 mb-0">
                        {slika === null ? "" : `Izabrana slika:${slika.name}`}{" "}
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
              <div className="flex justify-center ">
                <div className="p-4 gap-4 w-full sm:w-2/5">
                  <h4 className="text-xl font-bold mb-4 ">Promena Šifre</h4>
                  <div>
                    <label
                      htmlFor="exampleInputPassword1"
                      className="block mb-1"
                    >
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
                    <label
                      htmlFor="exampleInputPassword2"
                      className="block mb-1"
                    >
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
                    <label
                      htmlFor="exampleInputPassword3"
                      className="block mb-1"
                    >
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
        </div>
      </>
    );
};

export default AccountDispecer;
