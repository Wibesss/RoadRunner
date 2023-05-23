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
import IndexVozac from "./Pages/IndexVozac.js";
import DodeljeneTureVozac from "./Pages/DodeljeneTureVozac.js";
import VozacPonudjene from "./Pages/VozacPonudjene.js";
import VozacPrihvacene from "./Pages/VozacPrihvacene.js";
import VozacDodeljene from "./Pages/VozacDodeljene.js";
axios.defaults.baseURL = "http://localhost:5026";
axios.defaults.withCredentials = true;

function App() {
  return (
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
            <Route path="/registration/regVozac" element={<RegisterVozac />} />
          </Route>
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/vozacponudjene" element={<VozacPonudjene />}></Route>
          <Route path="/vozacprihvacene" element={<VozacPrihvacene />}></Route>
          <Route path="/vozacdodeljene" element={<VozacDodeljene />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
