import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="font-bold flex justify-between py-2  bg-gradient-to-t from-gray-100 to-gray-300">
      <Link
        to={"/"}
        className="flex items-center gap-1  hover:text-primary duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <span className="font-bold ">RoadRunner</span>
      </Link>
      
        {user?.role === "Vozac" && (
          <div className="flex gap-8  py-2 px-4 shadow-gray-300">
            <Link
              to={"/mojeTure"}
              className=" hover:text-primary duration-300 border-x-2 px-4 border-gray-300"
            >
              Moje Ture
            </Link>
            <Link to={"/"} className=" hover:text-primary duration-300">
              Home
            </Link>
          </div>
        )}
        {user ? (
          <Link
            to={user ? `/account` : "/login"}
            className="flex items-center gap-2 border border-zinc-400 rounded-full py-2 px-4  hover:text-primary duration-300"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 border border-gray-300 shadow-gray-300 rounded-full"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {user && <div>{user.korisnickoIme}</div>}
          </Link>
        ) : (
          <div className="flex gap-2 px-2">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/registration" className="btn-primary">
              Register
            </Link>
          </div>
        )}
      
    </header>
  );
};

export default Header;
