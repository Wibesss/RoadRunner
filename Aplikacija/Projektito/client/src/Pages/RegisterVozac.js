import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Modal } from "react-bootstrap";

const RegisterVozac = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  async function registerVozac(e) {
    e.preventDefault();
    try {
      const validationErrors = {};

      if (name.length < 3 || name.length > 30 || !/^[a-zA-Z]+$/.test(name)) {
        validationErrors.Ime =
          "Ime treba da ima između 3 i 30 karaktera i sadrži samo slovne karaktere.";
      }

      if (
        lastName.length < 3 ||
        lastName.length > 30 ||
        !/^[a-zA-Z]+$/.test(lastName)
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
        username.length < 1 ||
        username.length > 20 ||
        !/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)
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
      if (!/^\+?[0-9][0-9\s.-]{7,11}$/.test(number)) {
        validationErrors.Broj =
          "Broj mora da se sastoji samo od cifara i mora da ih bude od 7 do 11.";
      }

      if (Object.keys(validationErrors).length > 0) {
        // Validation failed, display error messages
        Object.keys(validationErrors).forEach((property) => {
          setStringGreska(
            `Greška u polju ${property}: ${validationErrors[property]}`
          );
          setShowAlert(true);
        });
        return;
      }
      if (photo !== null) {
        const imageRef = ref(storage, `vozaci/${photo.name + v4()}`);
        let photourl = "";
        uploadBytes(imageRef, photo).then(() => {
          getDownloadURL(imageRef).then(async (res) => {
            photourl = res;
            try {
              const response = await axios.post("/Vozac/AddVozac", {
                ime: name,
                prezime: lastName,
                jmbg: jmbg,
                email: email,
                korisnickoIme: username,
                sifra: pass,
                brojTelefona: number,
                slika: photourl,
              });

              if (response.status === 200) {
                // Successful response
                navigate("/login");
              } else {
                // Other error
                console.log("Server returned status code " + response.status);
              }
            } catch (error) {
              if (error.response && error.response.status === 400) {
                // Bad request response
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
                  // Handle other validation errors or unexpected error messages
                  console.log(errorMessage);
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
        <h1 className="text-2xl text-center bold mb-4">Registracija Vozača:</h1>
        <form
          className="max-w-lg mx-auto w-4/5 sm:w-full flex flex-col gap-1"
          onSubmit={registerVozac}
        >
          <input
            type="text"
            placeholder={"Ime:"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Prezime:"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Jmbg:"}
            value={jmbg}
            onChange={(e) => setJmbg(e.target.value)}
          />
          <input
            type="email"
            placeholder={"unesiEmail@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Korisnicko ime:"}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Šifra:"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="text"
            placeholder={"Broj telefona:"}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="file"
            id="customFilePhoto"
            name="file"
            placeholder={"Photo"}
            onChange={(e) => setPhoto(e.target.files[0])}
            hidden
            autoComplete="off"
          />
          <label
            className="btn-prim flex flex-row justify-center items-center"
            htmlFor="customFilePhoto"
          >
            Izaberi Sliku
          </label>
          <p className="text-muted mb-0">
            {photo === null ? "" : `Izabrana slika:${photo.name}`}
          </p>
        </form>
        <button className={"btn-prim btn-xl mt-6"}>Registruj se</button>
        <div className="text-center py-2">
          <h5>
            Vec imate nalog? <Link to={"/login"}>Prijavite se</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default RegisterVozac;
