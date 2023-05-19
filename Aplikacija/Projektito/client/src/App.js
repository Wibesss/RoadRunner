import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login.js";
import Layout from "./Layout.js";
import Index from "./Pages/Index.js";
import Register from "./Pages/Register.js";
import RegisterKompanija from "./Pages/RegisterKompanija.js";
import RegisterVozac from "./Pages/RegisterVozac.js";
import VozacOcene from "./Pages/VozacOcene.js";
import VozacPrikolice from "./Pages/VozacPrikolice.js";
import VozacVozila from "./Pages/VozacVozila.js";
import axios from "axios";
import { UserContextProvider } from "./UserContext.js";
import { useState } from "react";
import AccountPage from "./Pages/AccountPage.js";
axios.defaults.baseURL = "http://localhost:5026";
axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    document.body.classList.add("overflow-scroll");

    // Clean up the class on component unmount
    return () => {
      document.body.classList.remove("overflow-scroll");
    };
  }, []);
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />

            <Route path="/registration" element={<Register />}>
              <Route
                path="/registration/regKompanija"
                element={<RegisterKompanija />}
              />
              <Route
                path="/registration/regVozac"
                element={<RegisterVozac />}
              />
            </Route>
            <Route path="/account/:subpage?" element={<AccountPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
