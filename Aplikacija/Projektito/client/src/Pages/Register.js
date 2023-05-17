import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterKompanija from "./RegisterKompanija.js";
import RegisterVozac from "./RegisterVozac.js";
import { Link, Outlet } from "react-router-dom";
const Register = () => {
  return (
    <div>
      <div
        className={
          "my-5 grow flex flex-col items-center justify-around py-2 px-4 "
        }
      >
        <h5>Registruj se kao:</h5>
        <div className={"flex items-center justify-araound gap-2 "}>
          <Link to={"/registration/regKompanija"}>Kompanija</Link>
          <Link to={"/registration/regVozac"}>Vozač</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Register;
