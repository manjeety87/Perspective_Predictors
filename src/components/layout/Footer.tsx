import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800  py-4 text-center text-foreground text-sm">
      © {new Date().getFullYear()} Perscpective Predictors Labs — All rights
      reserved.
    </footer>
  );
};

export default Footer;
