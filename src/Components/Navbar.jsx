import React from "react";
import Logo from "../assets/img/Sabzi.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container-fluid px-5 header sticky-top">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 border-bottom border-dark">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img src={Logo} alt="Logo" />
        </Link>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 menu-color">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link px-2 menu-color">
              Products
            </Link>
          </li>
          <li className="mx-5">
            <Link to="/map" className="nav-link px-2 menu-color">
              Explore on a map
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <Link
            to="/search"
            className="bi bi-search fs-3 me-4 text-success"
          ></Link>
          <Link to="/cart" className="bi bi-cart fs-3 text-success">
            0
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
