import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const boja = isScrolled ? "text-white" : "text-primary";

  const iconColor = isScrolled ? "white" : "currentColor";

  const headerBg = isScrolled ? "bg-dark" : "bg-white";

  const menuOpen = openMenu ? "" : "hidden";

  return (
    <nav
      className={`navbar navbar-expand-lg ${headerBg} fixed-top`}
      id="mainNav"
    >
      <div className="container">
        <div className="flex flex-row">
          <Link
            to={"/"}
            className="navbar-brand flex flex'gitems-center gap-4 hover:text-primary duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={`${iconColor}`}
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <span className={`font-bold  ${boja}`}>RoadRunner</span>
          </Link>
          <button
            className={`flex mt-2 h-10 mr-10 sm:mr-2 justify-between navbar-toggler ${boja}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Menu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="ms-1"
              fill={`${iconColor}`}
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </div>
        <div
          className={`navbar-collapse ${menuOpen} justify-end`}
          id="navbarResponsive"
        >
          {user?.role === "Vozac" && (
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link to={"/vozacponudjene"} className={`nav-link ${boja}`}>
                  Ponuđene Ture
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/vozacprihvacene"} className={`nav-link ${boja}`}>
                  Prihvaćene Ture
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/vozacdodeljene"} className={`nav-link ${boja}`}>
                  Dodeljene Ture
                </Link>
              </li>
            </ul>
          )}
          {user?.role === "Kompanija" && (
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link to={"/kompanijature"} className={`nav-link ${boja}`}>
                  Moje Ture
                </Link>
              </li>
            </ul>
          )}

          {user?.role === "Dispecer" && (
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link to={"/dispecerture"} className={`nav-link ${boja}`}>
                  Ture
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/dispecervozaci"} className={`nav-link ${boja}`}>
                  Vozači
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/dispecerkompanije"} className={`nav-link ${boja}`}>
                  Kompanije
                </Link>
              </li>
            </ul>
          )}

          {user ? (
            <div className="pl-5">
              <Link
                to={user ? `/account` : "/login"}
                className={`flex items-center gap-2 border border-${iconColor} rounded-full py-2 px-4  hover:text-primary duration-300"`}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={`${iconColor}`}
                  className={`w-6 h-6 border border-${iconColor} rounded-full`}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                {user && <div className={`${boja}`}>{user.korisnickoIme}</div>}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 px-2">
              <Link
                to="/login"
                className="btn-prim"
                onClick={() => setOpenMenu(!openMenu)}
              >
                Prijavi se
              </Link>
              <Link
                to="/registration/vozac"
                className="btn-prim"
                onClick={() => setOpenMenu(!openMenu)}
              >
                Registruj se
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
