import React from "react";

const Footer = () => {
  return (
    <p className="border-top pt-3 text-center bg-light">
      Created by David Yakin &copy; {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
