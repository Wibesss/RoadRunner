import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
const RegisterKompanija = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [adress, setAdress] = useState("");
  const [owner, setOwner] = useState("");
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
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
        validationErrors.Broj = "Adresa treba da ima između 1 i 40 karaktera.";
      }
      if (owner.length < 1 || owner.length > 40) {
        validationErrors.Broj = "Vlasnik treba da ima između 1 i 40 karaktera.";
      }

      if (Object.keys(validationErrors).length > 0) {
        Object.keys(validationErrors).forEach((property) => {
          alert(`Greška u polju ${property}: ${validationErrors[property]}`);
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
                  alert("Vec postoji nalog sa tim emailom");
                } else if (
                  errorMessage === "Vec postoji nalog sa tim korisnickim imenom"
                ) {
                  alert("Vec postoji nalog sa tim korisnickim imenom");
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
  return (
    <div className=" grow flex items-center justify-around">
      <div className="my-1">
        <h1 className="text-2xl text-center bold mb-4">Registracija:</h1>
        <form className="max-w-lg mx-auto" onSubmit={registerKompanija}>
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
            placeholder={"Krosinicko ime"}
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
            placeholder={"Logo"}
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <button
            className={"bg-blue-300 text-white rounded-xl p-2 w-full my-5"}
          >
            Registruj se
          </button>
          <div className="text-center py-2">
            <h5>
              Nemate nalog? <Link to={"/registration"}>Kreirajte nalog</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterKompanija;
