import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const RegisterKompanija = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [adress, setAdress] = useState("");
  const [owner, setOwner] = useState("");
  const [logo, setLogo] = useState("");

  async function registerKompanija(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/Kompanija/AddKompanija", {
        naziv: name,
        email: email,
        korisnickoIme: userName,
        sifra: pass,
        adresa: adress,
        vlasnik: owner,
        logo: logo,
      });
      if (response.ok) {
        const data = await response.text();
        console.log(JSON.parse(data));
      } else {
        console.log("Server returned status code " + response.status);
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
            type="text"
            placeholder={"Logo"}
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
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
