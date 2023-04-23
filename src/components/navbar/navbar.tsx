import React from "react";
import "./navbar-css.css";
import logo from "./../../assets/customer-support.png";
function Navbar() {
  return (
    <>
      <header className="navbar-header">
        <div className="div-logo">
          <img src={logo} className="logo-image" />
          <p >Ticket Management</p>
        </div>
        <div className="btn-hover div-nav-btn">
          <a href="/">Home</a>
          <a href="/management">Management</a>
        </div>
      </header>
    </>
  );
}

export default Navbar;
