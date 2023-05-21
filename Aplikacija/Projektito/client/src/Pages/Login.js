import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedPass = encodeURIComponent(pass);
      const userInfo = await axios.post(
        `/Login/Login/${encodedEmail}/${encodedPass}`
      );
      setUser(userInfo.data);
      alert("Successfull login");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 text-bold grow flex items-center justify-around">
      <div className="my-20">
        <h1 className="text-2xl text-center mb-4">Login:</h1>
        <form
          className="max-w-lg mx-auto"
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
          <button className={"btn-primary w-full"}>Login</button>
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

export default Login;
