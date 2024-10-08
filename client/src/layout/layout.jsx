import React, { Children } from "react";
import PropTypes from "prop-types";
import Header from "@/components/custom/Header.jsx";
import { Link } from "react-router-dom";
import Hero from "@/components/custom/Hero.jsx";
import Footer from "@/components/custom/Footer.jsx";

function Layout({ children }) {
  // const {} = children

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
