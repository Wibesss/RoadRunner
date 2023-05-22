import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const KompanijaProfil = () => {
  const [redirect, setRedirect] = useState(null);
  const [kompanija, setKompanija] = useState([]);
  const [promenaSifre, setPromenasifre] = useState(false);
  const [edit, setEdit] = useState(false);

  const [naziv, setNaziv] = useState("");
  const [email, setEmail] = useState("");
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [adresa, setAdresa] = useState("");
  const [vlasnik, setVlasnik] = useState("");
  const [slika, setSlika] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);

  const [staraSifra, setStaraSifra] = useState("");
  const [novaSifra, setNovaSifra] = useState("");
  const [potvrdaSifra, setPotvrdaSifra] = useState("");
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  useEffect(() => {
    axios.get(`/Kompanija/GetKompanija/${user.id}`, config).then((response) => {
      setKompanija(response.data);
      setNaziv(response.data.naziv);
      setVlasnik(response.data.vlasnik);
      setAdresa(response.data.adresa);
      setEmail(response.data.email);
      setKorisnickoIme(response.data.korisnickoIme);
    });
  }, [updateUser]);

  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

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

      if (naziv.length < 3 ||
        naziv.length > 30 ||
        !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(naziv)) {
        validationErrors.Naziv =
          "Naziv treba da ima između 1 i 20 karaktera..";
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
      if ( adresa.length < 1 ||
        adresa.length > 40) {
        validationErrors.Adresa =
          "Adresa treba da ima između 1 i 40 karaktera.";
      }
      if ( vlasnik.length < 1 ||
        vlasnik.length > 40) {
        validationErrors.Vlasnik =
          "Vlasnik treba da ima između 1 i 40 karaktera.";
      }

      if (Object.keys(validationErrors).length > 0) {
        // Validation failed, display error messages
        Object.keys(validationErrors).forEach((property) => {
          alert(`Greška u polju ${property}: ${validationErrors[property]}`);
          window.location.reload();
        });
        return;
      }
      if (slika === null) {
        try {
          console.log("kurcina")
          const response = await axios.put(
            `/Kompanija/UpdateKompanija/${kompanija.id}`,
            {
              naziv: naziv,
              email: email,
              korisnickoIme: korisnickoIme,
              sifra: "",
              adresa: adresa,
              vlasnik: vlasnik,
              logo: kompanija.logo,
            },
            config
          );

          if (response.status === 200) {
            setUpdateUser(!updateUser);
          } else {
            console.log(response.status);
            console.log("Server returned status code " + response.status);
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            // Bad request response
            const errorMessage = error.response.data;
            if (errorMessage === "Vec postoji nalog sa tim emailom") {
              alert("Vec postoji nalog sa tim emailom");
              window.location.reload();
            } else if (
              errorMessage === "Vec postoji nalog sa tim korisnickim imenom"
            ) {
              alert("Vec postoji nalog sa tim korisnickim imenom");
              window.location.reload();
            } else {
              // Handle other validation errors or unexpected error messages
              console.log(errorMessage);
              //window.location.reload();
            }
          } else {
            // Other error
            console.log("Error:", error.message);
          }
        }
      } else {
        const imageRef = ref(storage, `kompanije/${slika.name + v4()}`);
        let slikaurl = "";
        uploadBytes(imageRef, slika).then(() => {
          getDownloadURL(imageRef).then((res) => {
            slikaurl = res;
            try {
              const response = axios.put(
                `/Kompanija/UpdateKompanija/${kompanija.id}`,
                {
                  naziv: naziv,
                  email: email,
                  korisnickoIme: korisnickoIme,
                  sifra: "",
                  adresa: adresa,
                  vlasnik: vlasnik,
                  logo: slikaurl,
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
                // Bad request response
                const errorMessage = error.response.data;
                if (errorMessage === "Vec postoji nalog sa tim emailom") {
                  alert("Vec postoji nalog sa tim emailom");
                  window.location.reload();
                } else if (
                  errorMessage === "Vec postoji nalog sa tim korisnickim imenom"
                ) {
                  alert("Vec postoji nalog sa tim korisnickim imenom");
                  window.location.reload();
                } else {
                  // Handle other validation errors or unexpected error messages
                  console.log(errorMessage);
                  window.location.reload();
                }
              } else {
                // Other error
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
    setNaziv(kompanija.naziv);
    setVlasnik(kompanija.vlasnik);
    setAdresa(kompanija.adresa);
    setEmail(kompanija.email);
    setKorisnickoIme(kompanija.korisnickoIme);
    setEdit(!edit);
  };

  const handlePromenaSifre = () => {
    if (novaSifra !== potvrdaSifra)
      return alert("Nova i potrvdra šifra se ne poklapaju");
    try {
      const encodedStaraSifra = encodeURIComponent(staraSifra);
      const encodedNovaSifra = encodeURIComponent(novaSifra);
      axios
        .put(
          `/Kompanija/UpdateSifra/${kompanija.id}/${encodedStaraSifra}/${encodedNovaSifra}`,
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
  };

  return (
    <form className="w-2/3 file-upload" autoComplete="off">
      <div className="flex row">
        <div className="flex justify-start mb-5 gap-5 w-2/3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setPromenasifre(!promenaSifre)}
          >
            Promeni Šifru
          </button>
          <button type="button" className="btn-primary" onClick={handleEdit}>
            Izmeni Profil
          </button>
          {edit && (
            <button
              type="button"
              className="btn-danger"
              onClick={handlePotrvdu}
            >
              Potvrdi izmene
            </button>
          )}
        </div>
        <div className="flex justify-end w-1/3">
          <button
            type="button"
            className="btn-danger mb-5"
            onClick={handleLogout}
          >
            Odjavi Se
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="">
          <h4 className="text-xl font-bold mb-10">Profilna Slika</h4>
          <div className="text-center">
            <div className="w-64 h-64 rounded-full mx-auto relative mb-20">
              <img
                className="rounded-md border-black border-4"
                src={kompanija.logo}
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
              <label className="btn-primary " htmlFor="customFile">
                Izaberi Novu Sliku
              </label>
            )}
            <p className="text-muted mt-3 mb-0">
              {slika === null ? "" : `Izabrana slika:${slika.name}`}{" "}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-xl font-bold mb-4">Detalji Profila</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Naziv</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Naziv"
                disabled={!edit}
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block mb-1">Vlasnik</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Vlasnik"
                disabled={!edit}
                value={vlasnik}
                onChange={(e) => setVlasnik(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block mb-1">Adresa</label>
              <input
                type="text"
                className="form-input"
                placeholder=""
                aria-label="Broj telefona"
                disabled={!edit}
                value={adresa}
                onChange={(e) => setAdresa(e.target.value)}
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
        </div>
      </div>

      {promenaSifre && (
        <div className="flex justify-center">
          <div className="p-4 gap-4 w-2/5">
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
                  className="w-1/3 btn-primary btn-lg mt-2"
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
  );
};

export default KompanijaProfil;
