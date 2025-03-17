import React from "react";

const About = () => {
  return (
    <footer className="bg-[#000000] dark:bg-slate-900 text-white py-10 border-t-2 border-white  ">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 xl:grid-cols-[2fr_1fr_1fr_2fr]">
          {/* About Us Section */}
          <div className="space-y-4 ">
            <div className="w-32">
              <img
                src="//rokan-theme.myshopify.com/cdn/shop/files/logo_white.png?v=1719496957&width=533"
                alt="Rokan Logo"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400 py-2 lg:pe-20 text-md xl:text-[17px]">
                Experience the Perfect Fusion of Style and Luxury, Where
                Elegance Meets Sophistication in Every Detail.
              </p>
              <p>
                <span className="font-semibold lg:text-[18px] text-gray-400">
                  Phone:
                </span>{" "}
                +222-1800-2628
              </p>
              <p>
                <span className="font-semibold lg:text-[18px] text-gray-400">
                  Address:
                </span>{" "}
                502 New Design Str, Melbourne, Australia
              </p>
              <p>
                <span className="font-semibold lg:text-[18px] text-gray-400">
                  Email:
                </span>{" "}
                rokan@domain.com
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Our Company</h3>
            <ul className="ul space-y-3 text-md">
              {[
                "About Us",
                "Our Stores",
                "Contact Us",
                "Size Guide",
                "My Account",
                "Timeline",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    className="hover:text-white text-gray-400"
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="space-y-2 ">
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="ul space-y-3 text-md">
              {[
                "Privacy Policy",
                "Theme FAQs",
                "Refund Policy",
                "Advanced Search",
                "Store Locations",
                "Term & Conditions",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`/${item
                      .toLowerCase()
                      .replace(/ & /g, "-")
                      .replace(" ", "-")}`}
                    className="hover:text-white text-gray-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4 xl:ps-5">
            <h3 className="text-lg xl:text-2xl font-semibold mb-4">
              Sign Up To Newsletter
            </h3>
            <p className="text-sm lg:text-lg text-gray-400 mb-4">
              Sign up for exclusive updates, new arrivals & insider only
              discounts
            </p>
            <form className="flex flex-col sm:flex-row gap-2 xl:py-3">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 p-2 rounded-full border-2 border-white"
                required
              />
              <button
                type="submit"
                className="bg-white hover:bg-gray-400 transition duration-200 cursor-pointer text-black px-6 py-2  rounded-full"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="mt-2 text-xs lg:text-[15px] text-gray-500">
              ***By entering the e-mail you accept the{" "}
              <a
                href="/pages/term-condition"
                className="text-white lg:text-[17px]"
              >
                terms and conditions
              </a>{" "}
              and the{" "}
              <a
                href="/pages/privacy-policy"
                className="text-white lg:text-[17px]"
              >
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default About;
