import React from "react";
import g20Logo from "../assets/image.png";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-7xl bg-white shadow-md w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div className="flex items-center">
        <img src={g20Logo} alt="G20 Logo" className="h-8 w-auto mr-2" />
        <p className="text-4xl font-bold text-[#75002b]">RailMadad</p>
        <p className="px-4 text-sm text-gray-600">
          For Inquiry, Assistance & Grievance Redressal
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          139
        </div>
        <div className="text-sm text-gray-600">
          for Security/Medical Assistance
        </div>
        <select
          className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-sm"
          onChange={(e) => console.log(e.target.value)}
        >
          <option>English</option>
          <option>Telugu</option>
        </select>
        <div className="bg-blue-700 rounded-full w-10">
          <img
            src="https://cdn.userway.org/widgetapp/images/body_wh.svg"
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
