import React from "react";
import Header from "./Header.js";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";

const Layout = () => {
  return (
    <div className="flex-col justify-between">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
