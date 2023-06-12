import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../UserContext";
const Register = () => {

  
  return (
    <div>
      <div
        className={"my-5 grow flex flex-col items-center justify-around px-4"}
      >
        <h5 className="sm:pt-6 text-lg">Registruj se kao:</h5>
        <div className={"flex items-center justify-araound pt-2 gap-2 "}>
          <Link className="btn-prim" to={"/registration/vozac"}>
            Vozač
          </Link>
          <Link className="btn-prim" to={"/registration/kompanija"}>
            Kompanija
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Register;
