import React from "react";
import Header from "./Header.js";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 to-gray-300">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
