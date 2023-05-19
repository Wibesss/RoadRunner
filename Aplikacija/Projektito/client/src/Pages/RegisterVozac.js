import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const RegisterVozac = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  async function registerVozac(e) {
    e.preventDefault();
    try {
      if (photo === null) {
      } else {
        const imageRef = ref(storage, `vozaci/${photo.name + v4()}`);

        console.log(imageRef);
        let photourl = "";
        uploadBytes(imageRef, photo).then(() => {
          getDownloadURL(imageRef).then((res) => {
            console.log(typeof res);
            photourl = res;

            const response = axios.post("/Vozac/AddVozac", {
              ime: name,
              prezime: lastName,
              jmbg: jmbg,
              email: email,
              korisnickoIme: username,
              sifra: pass,
              brojTelefona: number,
              slika: photourl,
            });

            if (response.ok) {
              const data = response.text();
              console.log(JSON.parse(data));
            } else {
              console.log("Server returned status code " + response.status);
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
        <form className="max-w-lg mx-auto" onSubmit={registerVozac}>
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
            placeholder={"Dodaj sliku"}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button className={"bg-blue-300 text-white rounded-xl p-2 w-full"}>
            Registruj se
          </button>
          <div className="text-center py-2">
            <h5>
              Vec imate nalog? <Link to={"/login"}>Prijavite se</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVozac;
