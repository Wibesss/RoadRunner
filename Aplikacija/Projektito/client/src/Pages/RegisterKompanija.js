import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { UserContext } from "../UserContext";
import MissingPage from "./MissingPage";

const RegisterKompanija = () => {
  const { user, ready } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [adress, setAdress] = useState("");
  const [owner, setOwner] = useState("");
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  if (ready && !user) {
    return <Navigate to="/" />;
  }

  async function registerKompanija(e) {
    e.preventDefault();
    try {
      const validationErrors = {};

      if (
        name.length < 3 ||
        name.length > 30 ||
        !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(name)
      ) {
        validationErrors.Naziv = "Naziv treba da ima između 1 i 20 karaktera.";
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
        userName.length < 1 ||
        userName.length > 20 ||
        !/^[a-zA-Z][a-zA-Z0-9]*$/.test(userName)
      ) {
        validationErrors.KorisnickoIme =
          "Korisničko ime treba da ima između 1 i 20 karaktera i može sadržati samo slovne karaktere i brojeve.";
      }
      if (
        pass.length < 1 ||
        pass.length > 20 ||
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          pass
        )
      ) {
        validationErrors.Sifra =
          "Sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera.";
      }
      if (adress.length < 1 || adress.length > 40) {
        validationErrors.Adresa =
          "Adresa treba da ima između 1 i 40 karaktera.";
      }
      if (owner.length < 1 || owner.length > 40) {
        validationErrors.Broj = "Vlasnik treba da ima između 1 i 40 karaktera.";
      }
      if (logo === null) {
        validationErrors.Logo = "Izaberite logo.";
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
      if (logo !== null) {
        const imageRef = ref(storage, `kompanije/${logo.name + v4()}`);
        let photourl = "";
        uploadBytes(imageRef, logo).then(() => {
          getDownloadURL(imageRef).then(async (res) => {
            photourl = res;
            try {
              const response = await axios.post("/Kompanija/AddKompanija", {
                naziv: name,
                email: email,
                korisnickoIme: userName,
                sifra: pass,
                adresa: adress,
                vlasnik: owner,
                logo: photourl,
              });
              if (response.status === 200) {
                navigate("/login");
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
                  setStringGreska(
                    "Vec postoji nalog sa tim korisnickim imenom."
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
    }
  }

  const handleClose = () => setShowAlert(false);

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

      <div className="my-1 grow flex flex-col items-center justify-around">
        <h1 className="text-2xl text-center bold mb-4">
          Registracija Kompanije:
        </h1>
        <form
          className="max-w-lg mx-auto w-4/5 sm:w-full flex flex-col gap-1"
          onSubmit={registerKompanija}
        >
          <input
            type="text"
            placeholder={"Naziv"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder={"unesiEmail@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Korsinicko ime"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Šifra"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Adresa"}
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Vlasnik(ime i prezime)"}
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <input
            type="file"
            id="customFileLogo"
            name="file"
            placeholder={"Logo"}
            onChange={(e) => setLogo(e.target.files[0])}
            hidden
            required
            autoComplete="off"
          />
          <label
            className="btn-prim flex flex-row justify-center items-center"
            htmlFor="customFileLogo"
          >
            Izaberi Logo
          </label>
          <p className="text-muted mb-0">
            {logo === null ? "" : `Izabrana slika:${logo.name}`}
          </p>
        </form>
        <button className={"btn-prim btn-xl mt-6"} onClick={registerKompanija}>
          Registruj se
        </button>
        <div className="text-center py-2">
          <h5>
            Nemate nalog? <Link to={"/registration"}>Kreirajte nalog</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default RegisterKompanija;
