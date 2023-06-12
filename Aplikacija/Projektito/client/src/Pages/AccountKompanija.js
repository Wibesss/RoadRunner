import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import KompanijaFavorizovani from "./KompanijaFavorizovani";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import KompanijaProfil from "./KompanijaProfil";
import MissingPage from "./MissingPage";

const AccountKompanija = () => {
  const { user } = useContext(UserContext);

  let { subpage } = useParams();
  

  if (subpage === undefined) {
    subpage = "profil";
  }

  const linkClasses = (type = null) => {
    let classes = "p-2 px-6 text-xl hover:text-primary duration-300";
    if (type === subpage) {
      classes = "p-2 px-6 text-xl bg-primary text-white rounded-xl";
    }
    return classes;
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role.toString() !== "Kompanija") {
    return <MissingPage />;
  }

  return (
    <div className="flex flex-col justify-center items-center font-bold w-full">
      <nav className="w-full flex items-center justify-center gap-1 sm:gap-5 mt-8 mb-8 p-2 shadow-sm">
        <Link className={linkClasses("profil")} to={"/account"}>
          Profil
        </Link>

        <Link
          className={linkClasses("favorizovani")}
          to={"/account/favorizovani"}
        >
          Favorizovani Vozaci
        </Link>
      </nav>
      {subpage === "profil" && <KompanijaProfil />}
      {subpage === "favorizovani" && <KompanijaFavorizovani />}
    </div>
  );
};

export default AccountKompanija;
