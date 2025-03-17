import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import About from "../About";

const AppLayout = () => {
  return (
    <div className=" w-screen overflow-x-hidden dark:bg-slate-900 h-screen dark:text-white">
      <Header />
      <Outlet />
      <About />
      <Footer />
    </div>
  );
};

export default AppLayout;
