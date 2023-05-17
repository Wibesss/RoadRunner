import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import VozacProfil from "./VozacProfil";
import VozacOcene from "./VozacOcene";

const AccountVozac = () => {
  const { user } = useContext(UserContext);

  let { subpage } = useParams();
  
  if (subpage === undefined) {
    subpage = "profil";
  }

  const linkClasses = (type = null) => {
    let classes = "p-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  return (
    <div className="font-bold">
      <nav className="w-full  flex justify-center mt-8 gap-2">
        <Link className={linkClasses("profil")} to={"/account"}>
          Profil
        </Link>

        <Link className={linkClasses("vozila")} to={"/account/vozila"}>
          Vozila
        </Link>

        <Link className={linkClasses("prikolice")} to={"/account/prikolice"}>
          Prikolice
        </Link>

        <Link className={linkClasses("ocene")} to={"/account/ocene"}>
          Ocene
        </Link>
      </nav>
      {subpage === "profil" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.korisnickoIme} ({user.email})<br />
          <button className="rounded-lg px-4 py-2 border-primary border-2 bg-primary text-white hover:bg-white hover:text-primary duration-300">
            Logout
          </button>
        </div>
      )}
      {subpage === "ocene" && (
        <VozacOcene />
        )}
    </div>
  );
};

export default AccountVozac;
