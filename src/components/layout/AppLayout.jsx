import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet, useLocation } from "react-router-dom";
import About from "../About";

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="w-screen overflow-x-hidden dark:bg-slate-900 h-screen dark:text-white bg-[#eff3f3]">
      {!isAdminRoute && <Header />}
      <main className="">
        <Outlet />
      </main>
      {!isAdminRoute && <About />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default AppLayout;
