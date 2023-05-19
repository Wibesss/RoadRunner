import React from "react";
import Header from "./Header.js";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
