import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t("raiseGrievance"), path: "/raise-grievance" },
    { name: t("chatBot"), path: "/chatbot" },
    { name: t("trackComplaint"), path: "/track-complaint" },
    { name: t("feedback"), path: "/feedback" },
  ];

  return (
    <nav className="w-64 bg-gray-900 text-white h-full">
      <ul className="mt-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 ${
                location.pathname === item.path ? "bg-gray-800" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
