import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useParams } from "react-router-dom";
import VozacProfil from "./VozacProfil";
import VozacVozila from "./VozacVozila";
import VozacOcene from "./VozacOcene";
import VozacPrikolice from "./VozacPrikolice";

const AccountVozac = () => {
  const { user } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profil";
  }

  const linkClasses = (type = null) => {
    let classes = "p-2 px-6 text-xl hover:text-primary duration-300";
    if (type === subpage) {
      classes = "p-2 px-6 text-xl bg-primary text-white rounded-full";
    }
    return classes;
  };

  return (
    <div className="flex flex-col items-center font-bold">
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
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
      {subpage === "profil" && <VozacProfil />}
      {subpage === "vozila" && <VozacVozila />}
      {subpage === "ocene" && <VozacOcene />}
      {subpage === "prikolice" && <VozacPrikolice />}
    </div>
  );
};

export default AccountVozac;
