import React from "react";
import logo from "../../assets/images/schroders-logo.png";

export default function Logo() {
  return (
    <a className="navbar-brand" href="#">
      <img src={logo} height="60" width="100" alt="Logo" loading="lazy" />
    </a>
  );
}
