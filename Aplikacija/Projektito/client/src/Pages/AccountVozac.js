import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import VozacProfil from "./VozacProfil";
import VozacVozila from "./VozacVozila";
import VozacOcene from "./VozacOcene";
import VozacPrikolice from "./VozacPrikolice";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import MissingPage from "./MissingPage";

const AccountVozac = () => {
  const { user, ready } = useContext(UserContext);
  const token = `Bearer ${Cookies.get("Token")}`;
  useEffect(() => {
    let connection;
    if (ready && user.role === "Vozac") {
      connection = new HubConnectionBuilder()
        .withUrl(
          `http://localhost:5026/notificationHub?username=${user.korisnickoIme}`,
          {
            accessTokenFactory: () => token,
          }
        )
        .build();

      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            toast(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              css: `
            background-color: white;
            `,
            });
          });
        })
        .catch((error) => {});
    }
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [ready]);

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

  if (user.role.toString() !== "Vozac") {
    return <MissingPage />;
  }

  return (
    <div className="flex flex-col justify-center items-center font-bold">
      <ToastContainer></ToastContainer>
      <nav className="w-full flex items-center justify-center gap-1 sm:gap-5 mt-8 mb-8 p-2 shadow-sm">
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
