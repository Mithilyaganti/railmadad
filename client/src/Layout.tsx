import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ">
            {children}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Layout;
