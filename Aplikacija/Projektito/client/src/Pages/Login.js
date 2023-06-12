import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Modal } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [showNeuspesno, setShowNeuspesno] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedPass = encodeURIComponent(pass);
      const userInfo = await axios.post(
        `/Login/Login/${encodedEmail}/${encodedPass}`
      );
      setUser(userInfo.data);
      setRedirect(true);
    } catch (e) {
      setShowNeuspesno(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  const handleClose = () => setShowNeuspesno(false);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Modal
        show={showNeuspesno}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Neuspešno Prijavljivanje</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pogrešan email ili lozinka, pokušajte ponovo.</Modal.Body>
        <Modal.Footer>
          <button className="btn-prim" onClick={handleClose}>
            Zatvori
          </button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4 text-bold grow flex items-center justify-around">
        <div className="my-20">
          <h1 className="text-2xl text-center mb-4">Prijavljivanje:</h1>
          <form
            className="max-w-lg mx-auto w-4/5"
            onSubmit={loginUser}
            autoComplete="off"
          >
            <input
              type="email"
              placeholder={"email@gmail.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="off"
            />
            <button className={"btn-prim btn-xl w-full"}>Prijavi se</button>
            <div className="text-center py-2">
              <h5>
                Nemate nalog?{" "}
                <Link to={"/registration/vozac"}>Kreirajte nalog</Link>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
