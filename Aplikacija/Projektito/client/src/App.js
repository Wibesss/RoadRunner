import { Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import Login from "./Pages/Login.js";
import Layout from "./Layout.js";
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
import VozacPonudjene from "./Pages/VozacPonudjene.js";
import VozacPrihvacene from "./Pages/VozacPrihvacene.js";
import VozacDodeljene from "./Pages/VozacDodeljene.js";
import KompanijaTure from "./Pages/KompanijaTure.js";
import DispecerTure from "./Pages/DispecerTure.js";
import DispecerVozaci from "./Pages/DispecerVozaci.js";
import DispecerKompanije from "./Pages/DispecerKompanije.js";
import Index from "./Pages/Index.js";
import { UserContext } from "./UserContext";
import MissingPage from "./Pages/MissingPage.js";

axios.defaults.baseURL = "http://localhost:5026";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(UserContext);

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />

          <Route path="/registration" element={<Register />}>
            <Route path="/registration/vozac" element={<RegisterVozac />} />
            <Route
              path="/registration/kompanija"
              element={<RegisterKompanija />}
            />
          </Route>

          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/vozacponudjene" element={<VozacPonudjene />}></Route>
          <Route path="/vozacprihvacene" element={<VozacPrihvacene />}></Route>
          <Route path="/vozacdodeljene" element={<VozacDodeljene />}></Route>
          <Route path="/kompanijature" element={<KompanijaTure />}></Route>
          <Route path="/dispecerture" element={<DispecerTure />}></Route>
          <Route path="/dispecervozaci" element={<DispecerVozaci />}></Route>
          <Route
            path="/dispecerKompanije"
            element={<DispecerKompanije />}
          ></Route>
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
