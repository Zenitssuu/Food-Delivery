import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav.jsx";
import MainNav from "./MainNav.jsx";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b-2 border-orange-500 shadow-sm transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo only */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            loading="lazy"
            alt="Easy Eats Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <MainNav />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
