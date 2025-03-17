import React from "react";
import payment from "../assets/images/payment.png";
const Footer = () => {
  return (
    <>
      <section className="~ w-screen flex align-middle border-t justify-between px-8 py-4 bg-black dark:bg-slate-900 text-white  ">
        <div>
          <p>© 2024 Rokan store. All rights reserved.</p>
        </div>
        <div>
          <img src={payment} alt="" />
        </div>
      </section>
    </>
  );
};

export default Footer;
